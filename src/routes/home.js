const express = require('express');
const router = express.Router();

// Root route
router.get('/', (req, res) => {
    res.send(`
        <pre>
Welcome to the Stringinator 3000 for all of your string manipulation needs.
GET / - You're already here!
POST /stringinate - Get all of the info you've ever wanted about a string. Takes JSON of the following form: {"input":"your-string-goes-here"}
GET /stats - Get statistics about all strings the server has seen, including the longest and most popular strings.
        </pre>
    `);
});

module.exports = router;
