const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    try {
        const ticket = new Ticket({ title, description });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: 'Error creating ticket', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tickets', error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ticket', error });
    }
});

router.put('/:id', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { title, description, status, updatedAt: Date.now() }, { new: true });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: 'Error updating ticket', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
});

module.exports = router;

