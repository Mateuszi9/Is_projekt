import React from "react"
import AuthService from "../services/AuthService"

const Profile = () => {
    const currentUser = AuthService.getCurrentUser()
    const token = currentUser.accessToken

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> | Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong>
                <br />
                {token.substring(0, token.length / 2)}<br />
                {token.substring(token.length / 2)}
            </p>
            <p>
                <strong>ID:</strong> {currentUser.id}
            </p>
            <p>
                <strong>E-mail:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    )
}

export default Profile
