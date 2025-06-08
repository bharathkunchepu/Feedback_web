const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug: Log incoming requests
app.use((req, res, next) => {
  console.log('Incoming request body:', req.body);
  next();
});

// ✅ Correct MongoDB connection (no line break)
mongoose.connect('mongodb+srv://kunchepubharath:bharath%402003@feedbackdb.ywgn11o.mongodb.net/feedbackdb?retryWrites=true&w=majority&appName=feedbackdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// POST /feedback
app.post('/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ error: 'Error saving feedback' });
  }
});

// GET /feedback
app.get('/feedback', async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching feedback' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Feedback API is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
