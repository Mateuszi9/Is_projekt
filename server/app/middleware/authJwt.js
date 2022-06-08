const jwt = require("jsonwebtoken")
const { user } = require("../models")
const db = require("../models")
require('dotenv').config()

const User = db.user

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(401).send({
            message: "Invalid header!"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: "Unauthorized!"
            })
        }
        req.userRoles = decoded.roles
        next()
    })
}

const isAdmin = async (req, res, next) => {
    try {
        const roles = await req.userRoles
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === "admin") {
                return next()
            }
        }
        return res.status(403).send({
            message: "Require Admin Role!",
        })
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Admin role!",
        })
    }
}

const isModerator = async (req, res, next) => {
    try {
        const roles = await req.userRoles
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === "moderator") {
                return next()
            }
        }
        return res.status(403).send({
            message: "Require Moderator Role!",
        })
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Moderator role!",
        })
    }
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJwt
