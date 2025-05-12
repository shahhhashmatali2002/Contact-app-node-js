import Contact from "../models/contacts.models.js";
import mongoose from "mongoose";

export const getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 3 } = req.query
        const options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        // const contacts = await Contact.find()
        const result = await Contact.paginate({}, options)
        res.render('home', {
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            currentPage: result.page,
            counter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            contacts: result.docs
        })
    } catch (error) {
        res.render('500', { message: error })
    }
}

export const getContact = async (req, res) => {
    try {
        const paramId = mongoose.Types.ObjectId.isValid(req.params.id)

        if (!paramId) {
            return res.render('404', { message: 'Invalid id!' })
        }
        const contact = await Contact.findOne({ _id: req.params.id })
        if (!contact) return res.render('404', { message: 'Contact not found!' })
        console.log(contact)
        return res.render('show-contact', { contact })
    } catch (error) {
        res.render('500', { message: error })
    }
}

export const addContactPage = async (req, res) => { res.render('add-contact') }

export const addContact = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email already exists
        const existingContact = await Contact.findOne({ email: email });
        console.log(existingContact)

        if (existingContact) {
            // Email already exists
            return res.render('404', { message: 'Email already exist!' })
        }

        // Create new contact
        await Contact.create(req.body);
        return res.redirect('/');
    } catch (error) {
        return res.render('500', { message: error })
    }
};

export const updateContactPage = async (req, res) => {
    try {
        const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!paramId) {
            return res.render('404', { message: 'Invalid id!' })
        }
        const contact = await Contact.findOne({ _id: req.params.id })
        console.log(contact)
        return res.render('update-contact', { contact })
    } catch (error) {
        res.render('500', { message: error })
    }
}

export const updateContact = async (req, res) => {
    try {
        const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!paramId) {
            return res.render('404', { message: 'Invalid id!' })
        }
        await Contact.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/')
    } catch (error) {
        res.render('500', { message: error })
    }
}

export const deleteContact = async (req, res) => {
    try {
        const paramId = mongoose.Types.ObjectId.isValid(req.params.id)
        if (!paramId) {
            return res.render('404', { message: 'Invalid id!' })
        }
        await Contact.findByIdAndDelete(req.params.id)
        res.redirect('/')
    } catch (error) {
        res.render('500', { message: error })
    }
}

