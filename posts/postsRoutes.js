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

// === GET ===

router.get('/', (req, res) => {
  db.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The posts could not be retrieved.' });
    });
});

// === GET BY ID ===

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The post information could not be retrieved.' });
    });
});

// === DELETE ===

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ message: `The post with the id ${id} has now been removed from the database.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'The post could not be removed.' });
    });
});

// === PUT ===

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  // const title = req.body.title;
  // const contents = req.body.contents;
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db.update(id, post)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The post with the specified id does not exist.' });
      } else {
        res.status(200).json({ post: { id, ...post } });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The post information could not be modified.' });
    });
});

module.exports = router;
