import React, { useState, useEffect } from "react"
import UserService from "../services/UserService"
import Diagrams from "./Diagrams"

const BoardUser = () => {
    const [content, setContent] = useState("")
    const [user, setUser] = useState(false)

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data)
                setUser(true)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                setContent(_content)
            }
        )
    }, [])

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
                {user ? <Diagrams/> : ""}
            </header>
        </div>
    )
}

export default BoardUser
