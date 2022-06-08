import React, { useState, useEffect } from "react"
import UserService from "../services/UserService"
import EventBus from "../common/EventBus"
import RecordsList from "./RecordsList"

const BoardAdmin = () => {
    const [content, setContent] = useState("")
    const [adminUser, setAdminUser] = useState(false)

    useEffect(() => {
        UserService.getAdminBoard().then(
            (response) => {
                setContent(response.data)
                setAdminUser(true)
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
                {adminUser ? <RecordsList/> : ""}
            </header>
        </div>
    )
}

export default BoardAdmin
