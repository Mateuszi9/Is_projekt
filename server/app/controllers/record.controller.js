const db = require("../models")
const Record = db.records
const Op = db.Sequelize.Op

// Create and Save a new record
exports.create = (req, res) => {
    if (!req.body.country || !req.body.year || !req.body.value) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return
    }
    // Create a record
    const record = {
        country: req.body.country,
        year: req.body.year,
        value: req.body.value
    }
    // Save a record in the database
    Record.create(record)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the record."
        })
    })
}
// Retrieve all records from the database.
exports.findAll = (req, res) => {
    const country = req.query.country
    const year = req.query.year
    var conditionCountry = country ? { country: { [Op.like]: `%${country}%` } } : null
    var conditionYear = year ? { year: { [Op.like]: `%${year}%` } } : null
    Record.findAll({ where: conditionCountry || conditionYear})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the records."
            })
        })
}
// Find a single record with an id
exports.findOne = (req, res) => {
    const id = req.params.id
    Record.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find the record with the id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving record with the id=" + id
            })
        })
}
// Update a record by the id in the request
exports.update = (req, res) => {
    const id = req.params.id
    Record.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The record was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update the record with the id=${id}. Maybe record was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating record with the id=" + id
            })
        })
}
// Delete a record with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id
    Record.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "The record was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete the record with the id=${id}. Maybe the record was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete the record with the id=" + id
            })
        })
}
// Delete all records from the database.
exports.deleteAll = (req, res) => {
    Record.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} records were deleted successfully!` })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all the records."
            })
        })
}
