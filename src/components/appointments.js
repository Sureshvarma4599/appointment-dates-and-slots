// Main component to display available time slots for appointments
import React, { useState, useEffect } from "react";
import slotsData from "../data/slots.json";
import "./appointments.css";
import DatePicker from "./dates";
import { groupSlotsByDate } from "../utils/utils";

const Appointments = () => {
  const [groupedSlots, setGroupedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleDateSelect = (date) => {
    setIsLoading(true);
    const dateSlots = groupedSlots.find((group) => group.date === date);
    setSelectedDate(date);
    setAvailableSlots(dateSlots ? dateSlots.slots : []);
    setTimeout(() => {
      setIsLoading(false); // loader for better user experience
    }, 500);
  };

  useEffect(() => {
    const generatedSlots = groupSlotsByDate(slotsData);
    if (generatedSlots && generatedSlots.length > 0) {
      setGroupedSlots(generatedSlots);
      setAvailableSlots(generatedSlots ? generatedSlots[0].slots : []);
      setSelectedDate(generatedSlots[0]?.date);
    }
  }, []);

  return (
    <div className="appointments-container">
      <h2 className="text-start">Pick a date</h2>
      <DatePicker
        groupedSlots={groupedSlots}
        selectedDate={selectedDate}
        setSelectedDate={handleDateSelect}
      />
      <h3 className="text-start">Available time slots</h3>
      <p className="text-start">Each session lasts for 30 minutes</p>
      <div className="time-slots cards">
        {availableSlots.length > 0 ? (
          isLoading ? (
            <p>{"Loading slots..."}</p>
          ) : (
            availableSlots.map((slot, index) => (
              <button
                key={index}
                className={`time-slot-button ${selectedSlot === slot ? "selected" : ""}`}
                onClick={() => handleSlotSelection(slot)}
              >
                {slot.displayTime}
              </button>
            ))
          )
        ) : (
          <p>No available slots for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
