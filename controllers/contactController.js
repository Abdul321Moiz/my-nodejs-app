const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

// Create a new contact
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400).json({ message: "All fields are mandatory" });
        return;
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

// Get a single contact
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
    }
    res.status(200).json(contact);
});

// Update a contact
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
});

// Delete a contact
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!contact) {
        res.status(404).json({ message: "Contact not found" });
        return;
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Contact deleted" });
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
