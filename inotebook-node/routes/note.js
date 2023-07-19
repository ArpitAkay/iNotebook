const express = require('express');
const router = express.Router();
const fetchusers = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const generateResponse = require('../util/GenerateResponse');

// ROUTE 1 : Get all the notes using GET "/api/notes/getuser". Authentication required
router.get('/fetchallnotes', fetchusers, async (req, res) => {
    try {
        let email = req.user.email;
        const notes = await Note.find({ email: email })
        return res.json(notes);
    }
    catch(error) {
        return res.status(500).json({error: await generateResponse(null, null, "Internal Server Error", null, null)});
    }
});

// ROUTE 2 : Add a new note using POST "/api/notes/addnote". Authentication required
router.post('/addnote', fetchusers, [
    body('title').isLength({ min: 3 }).escape(),
    body('description').isLength({ min: 3 }).escape(),
    body('tag').isLength({ min: 3 }).escape(),
], async (req, res) => {
    try {
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { title, description, tag } = req.body;
        console.log("title : " + title);
        console.log("description : " + description);
        console.log("tag : " + tag);

        const note = new Note({
            email: req.user.email, 
            title: title, 
            description: description, 
            tag: tag
        })

        const savedNote = await note.save();

        return res.json(savedNote);
    }
    catch(error) {
        return res.status(500).json({error: await generateResponse(null, null, "Internal Server Error", null, null)});
    }
});

// ROUTE 3 : Update an existing note using PUT "/api/notes/updatenote". Authentication required
router.patch('/updatenote/:id', fetchusers, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
    
        //Create a new note object
        const newNote = {};
    
        if(title) {
            newNote.title = title;
        }
        if(description) {
            newNote.description = description;
        }
        if(tag) {
            newNote.tag = tag;
        }
    
        //Find the note to be updated and update it
        let noteInDb = await Note.findById(req.params.id);
    
        if(!noteInDb) {
            return res.status(404).send({error: await generateResponse("field", req.params.id, "Not found", "id", "params")});
        }
    
        if(noteInDb.email !== req.user.email) {
            return res.status(401).send({error: await generateResponse("field", req.user.email, "Not allowed", "email", "authToken")});
        }
    
        noteInDb = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    
        return res.status(200).send(noteInDb);
    }
    catch(error) {
        return res.status(500).json({error: await generateResponse(null, null, "Internal Server Error", null, null)});
    }
});

// ROUTE 4 : Delete an existing note using DELETE "/api/notes/deletenote". Authentication required
router.delete('/deletenote/:id', fetchusers, async (req, res) => {
    try {
        //Find the note to be delete and delete it
        console.log(req.params.id)
        let noteInDb = await Note.findById({_id: req.params.id});
        console.log(noteInDb);

        if(!noteInDb) {
            return res.status(401).send({error: await generateResponse("field", req.params.id, "Not found", "id", "params")});
        }

        //Allow deletion only if user owns this note
        if(noteInDb.email !== req.user.email) {
            return res.status(401).send({error: await generateResponse("field", req.user.email, "Not allowed", "email", "authToken")});
        }

        noteInDb = await Note.findByIdAndDelete(req.params.id);

        return res.status(200).send({Success: "Note has been deleted", note: noteInDb})
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({error: await generateResponse(null, null, "Internal Server Error", null, null)});
    }
})

module.exports = router;