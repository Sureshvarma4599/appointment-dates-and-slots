// Main component to display available time slots for appointments
import React, { useState, useEffect } from 'react';
import slotsData from './slots.json'; // Assuming the slots data is in slots.json
import moment from 'moment'; // Import moment.js
import './appointments.css'; // Include your styles for visual presentation
import DatePicker from './dates';
// Helper function to group slots by date using moment.js
const groupSlotsByDate = (data) => {
  const grouped = data.reduce((acc, slot) => {
    const date = moment.unix(slot.startTimeUtc).format('YYYY/MM/DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});
  
  return Object.entries(grouped).map(([date, slots]) => ({
    date,
    day: moment(date, 'YYYY/MM/DD').format('ddd'),
    display: moment(date, 'YYYY/MM/DD').format('DD/MM'),
    slots,
  }));
};

// Main Appointments component
const Appointments = () => {
  const [groupedSlots,setGroupedSlots] = useState([])
  const [selectedDate, setSelectedDate] = useState(groupedSlots[0]?.date || '');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  useEffect(()=>{
    const generatedSlots = groupSlotsByDate(slotsData);
    console.log("groupedSlots",generatedSlots)
    setGroupedSlots(generatedSlots);
    setAvailableSlots(generatedSlots && generatedSlots.length>0 ? generatedSlots[0]?.slots : []);
  },[])

  useEffect(() => {
    console.log("selectedDate",selectedDate)
    const dateSlots = groupedSlots.find((group) => group.date === selectedDate);
    setAvailableSlots(dateSlots ? dateSlots.slots : []);
  }, [selectedDate]);


  return (
    <div className="appointments-container">
      <h2>Pick a date</h2>
      <DatePicker groupedSlots={groupedSlots} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {/* <div className="date-picker cards">
        {groupedSlots.map((group, index) => (
          <button
            key={index}
            className={`date-button ${selectedDate === group.date ? 'selected' : ''}`}
            onClick={() => setSelectedDate(group.date)}
          >
            <div>{group.day}</div>
            <div>{group.display}</div>
          </button>
        ))}
      </div> */}

      <h3>Available time slots</h3>
      <p>Each session lasts for 30 minutes</p>
      <div className="time-slots cards">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <button
              key={index}
              className={`time-slot-button ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => handleSlotSelection(slot)}
            >
              {slot.displayTime}
            </button>
          ))
        ) : (
          <p>No available slots for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;