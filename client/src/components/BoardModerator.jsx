import React, { useState, useEffect } from "react"
import UserService from "../services/UserService"
import EventBus from "../common/EventBus"
import AddRecord from "./AddRecord"

const BoardModerator = () => {
    const [content, setContent] = useState("")
    const [modUser, setModUser] = useState(false)

    useEffect(() => {
        UserService.getModeratorBoard().then(
            (response) => {
                setContent(response.data)
                setModUser(true)
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()

                setContent(_content)

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout")
                }
            }
        )
    }, [])

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
                {modUser ? <AddRecord /> : ""}
            </header>
        </div>
    )
}

export default BoardModerator