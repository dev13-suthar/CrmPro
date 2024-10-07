"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';

const CreateEventForm = () => {
  const { data: session } = useSession();
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    timeZone: 'Asia/Kolkata',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    if (!session) return alert('You must be logged in');

    const res = await fetch('/api/google/newevent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: eventDetails.summary,
        location: eventDetails.location,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.startDateTime,
          timeZone: eventDetails.timeZone,
        },
        end: {
          dateTime: eventDetails.endDateTime,
          timeZone: eventDetails.timeZone,
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      }),
    });

    const data = await res.json();
    
    if (res.ok) {
      alert(`Event created! View it here: ${data.link}`);
    } else {
      alert('Error creating event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="summary" placeholder="Event Summary" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="startDateTime" type="datetime-local" onChange={handleChange} required />
      <input name="endDateTime" type="datetime-local" onChange={handleChange} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;