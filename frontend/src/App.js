import React, { useState, useEffect } from 'react';
import './App.css';  // import the CSS file

function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetch('https://feedback-web.onrender.com')
      .then(res => res.json())
      .then(data => setFeedbackList(data))
      .catch(console.error);
  }, []);
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to submit');
        return res.json();
      })
      .then(() => {
        alert('Feedback submitted!');
        setFormData({ name: '', email: '', message: '' });
        return fetch('http://localhost:5000/feedback');
      })
      .then(res => res.json())
      .then(data => setFeedbackList(data))
      .catch(err => alert(err.message));
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
