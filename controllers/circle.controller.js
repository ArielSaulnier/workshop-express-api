const db = require("../models");
const Circle = db.circles;

// Create and Save a new circle
exports.create = (req, res) => {
    // Validate request
    if (!req.body.fname) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a circle
    const circle = new Circle({
        name: req.body.name,
        members: req.body.members,
        messages: [],
        owner: req.body.owner,
        settings: {
            msgDeletionTime: null,
            color: "#434343"
        },
        isDirect: req.body.isDirect
    });

    // Save circle in the database
    circle
        .save(circle)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the circle."
            });
        });
};

// Retrieve all circles from the database.
exports.findAll = (req, res) => {
    const name = req.query.fname;
    var condition = fname ? {
        fname: {
            $regex: new RegExp(fname),
            $options: "i"
        }
    } : {};

    Circle.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving circles."
            });
        });
};

// Find a single circle with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Circle.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found circle with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving circle with id=" + id
                });
        });
};

// Update a circle by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Circle.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update circle with id=${id}. Maybe circle was not found!`
                });
            } else res.send({
                message: "circle was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating circle with id=" + id
            });
        });
};

// Delete a circle with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Circle.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete circle with id=${id}. Maybe circle was not found!`
                });
            } else {
                res.send({
                    message: "circle was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete circle with id=" + id
            });
        });
};

// Delete all circles from the database.
exports.deleteAll = (req, res) => {
    Circle.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} circles were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all circles."
            });
        });
};

// Find all published circles
exports.findAllLocked = (req, res) => {
    Circle.find({
            locked: true
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving circles."
            });
        });
};