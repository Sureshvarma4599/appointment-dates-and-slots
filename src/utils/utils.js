import moment from 'moment'; // Import moment.js

// Helper function to group slots by date using moment.js
export const groupSlotsByDate = (data) => {
  const grouped = data.reduce((acc, slot) => {
    const date = moment.unix(slot.startTimeUtc).format("YYYY/MM/DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, slots]) => ({
    date,
    day: moment(date, "YYYY/MM/DD").format("ddd"),
    display: moment(date, "YYYY/MM/DD").format("DD/MM"),
    slots,
  }));
};
