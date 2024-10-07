"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { DateSelectArg,EventInput } from '@fullcalendar/core/index.js';
import FullCalender from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import styles from './CalenderPage.module.css';


const CalendarPage = () => {
    const [events, setEvents] = useState<EventInput[]>([]); // Ensure events default to an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setisDialogOpen] = useState(false);
    const [newEventTitle, setnewEventTitle] = useState("");
    const [selectedDate, setselectedDate] = useState<DateSelectArg | null>(null)

    const handleDateClick = (selected:DateSelectArg)=>{
        setselectedDate(selected);
        setisDialogOpen(true);
    };
    const handleCLoseDialog = ()=>{
        setisDialogOpen(false);
        setnewEventTitle("");
    }
    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newEventTitle && selectedDate) {
          const calendarApi = selectedDate.view.calendar;
          calendarApi.unselect();
      
          const start = selectedDate.start;
          const end = new Date(start);
          end.setHours(end.getHours() + 1); 
      
          // Check if the event spans an entire day (midnight to midnight or no specific end time)
          const isAllDay = !end || (start.toDateString() === end.toDateString() && start.getHours() === 0 && end.getHours() === 0);
      
          const newEvent = {
            id: `${start.toISOString()}-${newEventTitle}`,
            title: newEventTitle,
            start,
            end: end, // Set the end to null if all-day
          };
      
          calendarApi.addEvent(newEvent);
      
          const eventData = {
            summary: newEventTitle,
            start,
            end,
            allDay: isAllDay,
          };
      
          try {
            const response = await fetch('/api/google/newevent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(eventData),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              console.log('Event created, view it at:', data.link);
              return data.link;
            } else {
              console.error('Error creating event:', await response.text());
            }
          } catch (error) {
            console.error('Network or server error:', error);
          } finally {
            handleCLoseDialog();
          }
        }
      };
      

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/google/event'); // Adjust the path as needed
                if (!res.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await res.json();

                // Format events correctly, ensuring they are Date objects
                const formattedEvents = data.events.map((event: { id: string; summary: string; start: { dateTime: string | null; date: string | null; }; end: { dateTime: string | null; date: string | null; }; }) => ({
                  id: event.id,
                  title: event.summary,
                  start: event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date!), // handle all-day events
                  end: event.end.dateTime ? new Date(event.end.dateTime) : new Date(event.end.date!),
              }));
              
              setEvents(formattedEvents);
                
                setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err:any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array so it runs once

    if (loading) {
        return <div className='h-[90vh] w-[90vw] flex items-center justify-center'>
          <p>Loading events... This may take minutess...</p>
        </div>;
    }

    if (error) {
        return <div className='h-full w-full items-center justify-center'>
            <p>{error}</p>
            <p>Try connecting your Google Calender</p>
        </div>
    }

    return (
        <div className='p-3 flex items-center justify-center h-full w-full flex-col'>
            {/* Calendar Component */}
            <div style={{ height: '600px', width: '100%' }} className={styles.calendarContainer}>
                <FullCalender
                height={"600px"}
                plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                headerToolbar={{left:"prev,next,today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay"}}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                select={handleDateClick}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                eventsSet={(events)=>setEvents(events)}
                displayEventTime={false}
                dayMaxEvents={true}
                initialEvents={events} 
                />    
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new Event</DialogTitle>
                    </DialogHeader>
                    <form action="" onSubmit={handleAddEvent} className='space-y-4'>
                        <Input placeholder='Title' value={newEventTitle} onChange={(e)=>setnewEventTitle(e.target.value)} className='w-full'/>
                        <Button type='submit' className='w-full'>Submit</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CalendarPage;