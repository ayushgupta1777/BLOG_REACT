const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Box = require('./models/Box'); // Create a Box model for MongoDB

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://new:n1e2w3@cluster0.vg2u5rd.mongodb.net/BlogApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Create an endpoint to add a box
app.post('/api/add-box', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBox = new Box({ title, content });
    await newBox.save();
    res.status(200).json(newBox);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a box' });
  }
});

// Create an endpoint to get all boxes
app.get('/api/get-boxes', async (req, res) => {
  try {
    const boxes = await Box.find();
    res.status(200).json(boxes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get boxes' });
  }
});

// Create an endpoint to delete a box by ID
app.delete('/api/delete-box/:id', async (req, res) => {
  try {
    await Box.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Box deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete a box' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
