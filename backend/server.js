const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/feedback');

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://kunchepubharath:bharath%402003@feedbackdb.ywgn11o.mongodb.net/?retryWrites=true&w=majority&appName=feedbackdb')
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('MongoDB Atlas connection error:', err));

// POST /feedback
app.post('/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ error: 'Error saving feedback' });
  }
});

// GET 
app.get('/feedback', async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching feedback' });
  }
});
app.get('/', (req, res) => {
  res.send('Feedback API is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
