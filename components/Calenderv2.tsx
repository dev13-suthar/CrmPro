"use client";

import React from 'react'
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const textEvetn = [
    {
      "id": 1,
      "title": "Event 1",
      "start": "2024-09-30T10:00:00",
      "end": "2024-09-30T11:00:00"
    },
    {
      "id": 2,
      "title": "Event 2",
      "start": "2024-10-01T12:00:00",
      "end": "2024-10-01T13:00:00"
    }
  ]

const CalenderPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const formattedEvent = events.map((e:any)=>{
        return {
            title:String(e.summary),
            id:Number(e.id),
            start:String(e.start.dateTime),
            end:String(e.end.dateTime)
        }
    })
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const res = await fetch('/api/google/event');
            if (!res.ok) {
              throw new Error('Failed to fetch events');
            }
            const data = await res.json();
            setEvents(data.events);
            setLoading(false);
          } catch (err:any) {
            setError(err.message);
            setLoading(false);
          }
        };
    
        fetchEvents();
      }, []);

      if (loading) {
        return <div>Loading calendar events...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      console.log(events);

  return (
    <div className='p-3 flex items-center justify-center h-full w-full flex-col'>
        <Button onClick={()=>{
            router.push("/api/google/connect")
        }}>Connect to google calender</Button>
         {/* <div> */}
      {/* <h1>Google Calendar Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.summary}</strong>
              <p>
                Start: {new Date(event.start.dateTime).toLocaleString()}
              </p>
              <p>
                End: {new Date(event.end.dateTime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div> */}
     <div style={{ height: '600px', color:"red" }}>
      <Calendar
        localizer={formattedEvent}
        events={textEvetn}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        popup
        views={['month', 'week', 'day']}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "red",
            color:"black" // Customize event color
          },
        })}
      />
    </div>
    </div>
  )
}

export default CalenderPage
