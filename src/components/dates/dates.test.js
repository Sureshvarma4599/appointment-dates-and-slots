import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './dates'; // Adjust path as needed
import { ArrowLeft, ArrowRight } from 'lucide-react';

jest.mock('lucide-react', () => ({
  ArrowLeft: jest.fn(() => <div>ArrowLeft</div>),
  ArrowRight: jest.fn(() => <div>ArrowRight</div>),
}));

describe('DatePicker', () => {
  const mockSetSelectedDate = jest.fn();

  const groupedSlots = [
    { date: '2024/11/01', display: '01/11', day: 'Fri' },
    { date: '2024/11/02', display: '02/11', day: 'Sat' },
    { date: '2024/11/03', display: '03/11', day: 'Sun' },
  ];

  test('should call setSelectedDate when a date is clicked', () => {
    render(
      <DatePicker
        groupedSlots={groupedSlots}
        selectedDate=""
        setSelectedDate={mockSetSelectedDate}
      />
    );

    // Select the first date
    const firstDateButton = screen.getByText('01');
    fireEvent.click(firstDateButton);

    // Ensure the mock function is called with the correct date
    expect(mockSetSelectedDate).toHaveBeenCalledWith('2024/11/01');
  });
});
