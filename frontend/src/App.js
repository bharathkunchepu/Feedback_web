import React, { useState, useEffect } from 'react';
import './App.css'; 

function FeedbackForm() {
  const BACKEND_URL = 'https://feedback-web.onrender.com'; 

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    try {
      const res = await fetch(`${https://feedback-web.onrender.com}/feedback`);
      if (!res.ok) throw new Error('Error fetching feedback');
      const data = await res.json();
      setFeedbackList(data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit feedback');

      alert('Feedback submitted!');
      setFormData({ name: '', email: '', message: '' });
      await fetchFeedback(); 
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <textarea
            name="message"
            placeholder="Feedback"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3>All Feedback</h3>
      <ul className="feedback-list">
        {feedbackList.map((fb) => (
          <li key={fb._id}>
            <strong>{fb.name}</strong> (<small>{fb.email}</small>)<br />
            {fb.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackForm;
