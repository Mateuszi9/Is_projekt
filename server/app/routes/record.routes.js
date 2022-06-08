module.exports = app => {
    const records = require("../controllers/record.controller.js");
    var router = require("express").Router();
    // Create a new record
    router.post("/", records.create);
    // Retrieve all the records
    router.get("/", records.findAll);
    // Retrieve a single record with the id
    router.get("/:id", records.findOne);
    // Update the record with the id
    router.put("/:id", records.update);
    // Delete the record with the id
    router.delete("/:id", records.delete);
    // Delete all the records
    router.delete("/", records.deleteAll);
    
    app.use('/api/records', router);
};