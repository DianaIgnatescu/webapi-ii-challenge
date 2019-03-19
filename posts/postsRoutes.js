const express = require('express');

const router = express.Router();
const db = require('../data/db');

// === POST ===

router.post('/', (req, res) => {
  const { title, contents } = req.body;
  // const contents = req.body.contents;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  const created_at = new Date();
  const updated_at = created_at;
  db.insert({
    title, contents, created_at, updated_at,
  })
    .then((data) => {
      res.status(201).json({
        id: data.id,
        title,
        contents,
        created_at,
        updated_at,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'There was an error while saving the post to the database.' });
    });
});

module.exports = router;
