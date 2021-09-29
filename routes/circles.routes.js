module.exports = app => {
    const circles = require("../controllers/circle.controller.js");

    var router = require("express").Router();

    // Create a new circle
    router.post("/", circles.create);

    // Retrieve all circles
    router.get("/", circles.findAll);

    // Retrieve all published circles
    router.get("/locked", circles.findAllLocked);

    // Retrieve a single circle with id
    router.get("/:id", circles.findOne);

    // Update a circle with id
    router.put("/:id", circles.update);

    // Delete a circle with id
    router.delete("/:id", circles.delete);

    // Create a new circle
    router.delete("/", circles.deleteAll);

    app.use('/api/circles', router);
};