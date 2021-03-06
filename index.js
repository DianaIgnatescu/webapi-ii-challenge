const express = require('express');

const postsRoutes = require('./posts/postsRoutes');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRoutes);

server.listen(5000, () => console.log('Listening on port 5000'));
