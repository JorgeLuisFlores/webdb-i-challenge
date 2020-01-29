const express = require("express");
const accountsdb = require('./account-helper.js');
const router = express.Router();

router.get("/", (req, res) => {
    accountsdb
        .get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(404).json({
                message: "Cannot find Accounts!"
            });
        });
});



router.get("/:id", (req, res) => {
    accountsdb.getById(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(400).json({
                    message: "The account with the specified ID does not exist!"
                });
            }
        })

        .catch(err => {
            res.status(500).json({
                message: "Error retrieving the requested account!"
            });
        });

});

router.post("/", validateAccount, (req, res) => {
    accountsdb
        .insert(req.body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: "Unable to post the account!"
            });
        });
});



router.put("/:id", validateAccount, (req, res) => {
    accountsdb.update(req.params.id, req.body)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    message: "The account with the specified ID does not exist!"
                });
            }
        });
});



router.delete("/:id", (req, res) => {
    accountsdb.remove(req.params.id)
        .then(user => {
            if (user > 0) {
                res.status(200).json({
                    message: "Account has been deleted!"
                });
            } else {
                res.status(404).json({
                    message: "The account with the specified ID does not exist!"
                });
            }
        });
});


// Middleware
function validateAccount(req, res, next) {
    if (!req.body.name || !req.body.budget) {
        res.status(404).json({
            message: "Missing Name & Budget for the account!"
        });
    } else {
        next();
    }
}


module.exports = router;