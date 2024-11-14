import React, { useRef } from 'react';
import './appointments.css'; 

const DatePicker = ({ groupedSlots, selectedDate, setSelectedDate }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="date-picker-wrapper cards">
      <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
      <div className="date-picker cards" ref={scrollContainerRef} style={{ overflowX: 'auto', display: 'flex', scrollBehavior: 'smooth' }}>
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
      </div>
      <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
    </div>
  );
};

export default DatePicker;