const express = require("express");
const router = express.Router();
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// Apply validateToken middleware to all routes in this router
router.use(validateToken);

// Route definitions grouped by path for better readability
router.route("/")
    .get(getContacts)       // Get all contacts
    .post(createContact);   // Create a new contact

router.route("/:id")
    .get(getContact)        // Get a single contact by id
    .put(updateContact)     // Update a contact by id
    .delete(deleteContact); // Delete a contact by id

module.exports = router;
