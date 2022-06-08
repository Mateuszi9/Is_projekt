const db = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const User = db.user
const Role = db.role
const Op = db.Sequelize.Op

exports.signup = async (req, res) => {
    // Save User to Database
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            })
            const result = user.setRoles(roles)
            if (result) res.send({ message: "User registered successfully!" })
        } else {
            // user has role = 1
            const result = user.setRoles([1])
            if (result) res.send({ message: "User registered successfully!" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        })
        if (!user) {
            return res.status(404).send({ message: "User Not found." })
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            })
        }
        let authorities = []
        const roles = await user.getRoles()
        for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i].name)
        }
        const token = jwt.sign(
            { "roles": authorities },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d", })
        
        
        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

exports.signout = async (req, res) => {
    try {
        req.session = null
        return res.status(200).send({
            message: "You've been signed out!"
        })
    } catch (err) {
        this.next(err)
    }
}
