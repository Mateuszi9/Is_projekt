import React, { useState, useEffect } from "react"
import { Routes, Route, Link, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import AuthService from "./services/AuthService"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Profile from "./components/Profile"
import BoardModerator from "./components/BoardModerator"
import BoardUser from "./components/BoardUser"
import BoardAdmin from "./components/BoardAdmin"
import BoardAdminId from "./components/BoardAdminId"
import AddRecord from "./components/AddRecord"
import EventBus from "./common/EventBus"


const App = () => {
  const [modUser, setModUser] = useState(false)
  const [adminUser, setAdminUser] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setModUser(user.roles.includes("moderator"))
      setAdminUser(user.roles.includes("admin"))
    }

    EventBus.on("logout", () => {
      logOut()
    })

    return () => {
      EventBus.remove("logout")
    }
  }, [])

  const logOut = () => {
    AuthService.logout()
    setModUser(false)
    setAdminUser(false)
    setCurrentUser(undefined)
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Integracja Systemów
        </Link>
        <div className="navbar-nav me-auto">
          {currentUser && (
            <li className="nav-item">
              <Link to={"/diagrams"} className="nav-link">
                Diagrams
              </Link>
            </li>
          )}
          
          {modUser && (
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Records
              </Link>
            </li>
          )}
          {adminUser && (
            <li className="nav-item">
              <Link to={"/records"} className="nav-link">
                Records List
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          {/* <Route path="/" element={currentUser ? <Navigate to="/diagrams" replace={true} /> : <Navigate to="/login" replace={true} />} />
          <Route path="/login" element={currentUser ? <Navigate to="/diagrams" replace={false} /> : <Login />} />
          <Route path="/register" element={currentUser ? <Navigate to="/diagrams" replace={true} /> : <Register />} />
          <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" replace={true} />} />
          <Route path="/diagrams" element={currentUser ? <Home /> : <Navigate to="login" replace={true} />} />
          <Route path="/add" element={modUser ? <AddRecord /> : <Navigate to="/" replace={true} />} />
          <Route path="/records" element={adminUser ? <RecordsList /> : <Navigate to="/" replace={true} />} />
          <Route path="/records/:id" element={adminUser ? <Record /> : <Navigate to="/" replace={true} />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/register" element={ <Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/records" element={<BoardAdmin />} />
          <Route path="/records/:id" element={<BoardAdminId />} />
          <Route path="/diagrams" element={<BoardUser />} />
          <Route path="/add" element={<BoardModerator />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </div>
    </div>
  )
}
export default App