import React, { useState } from 'react';

const GeneralSettings = () => {
  const apiUrl = import.meta.env.VITE_Backend_URL;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/config/update-general`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Title and description updated successfully!');
      } else {
        setMessage('Failed to update title and description.');
      }
    } catch (error) {
      console.error('Error updating title and description:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-semibold mb-2">Event Name</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-lg font-semibold mb-2">Event Description</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="border p-2 w-full"
          rows="4"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Update
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </form>
  );
};

export default GeneralSettings;
