const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Basic API endpoint for the contact form
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // In a real app, you would send an email or save to a database here
    console.log(`New contact submission from ${name} (${email}): ${message}`);

    res.json({ success: true, message: 'Thank you for reaching out! We will get back to you soon.' });
});

app.listen(PORT, () => {
    console.log(`BDW Tech server running on http://localhost:${PORT}`);
});
