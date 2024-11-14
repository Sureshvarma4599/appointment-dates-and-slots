import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Appointments from './appointments';

// Mock data for testing
const mockSlotsData = [
  { date: '2024-11-14', slots: [{ displayTime: '10:00 AM' }, { displayTime: '11:00 AM' }] },
  { date: '2024-11-15', slots: [{ displayTime: '12:00 PM' }, { displayTime: '01:00 PM' }] },
];

// Mock imports
jest.mock('../../data/slots.json', () => ({
  __esModule: true,
  default: [
    { date: '2024-11-14', slots: [{ displayTime: '10:00 AM' }, { displayTime: '11:00 AM' }] },
    { date: '2024-11-15', slots: [{ displayTime: '12:00 PM' }, { displayTime: '01:00 PM' }] },
  ], // Correcting the mock for JSON import
}));

jest.mock('../../utils/utils', () => ({
  groupSlotsByDate: jest.fn(() => [
    { date: '2024-11-14', slots: [{ displayTime: '10:00 AM' }, { displayTime: '11:00 AM' }] },
    { date: '2024-11-15', slots: [{ displayTime: '12:00 PM' }, { displayTime: '01:00 PM' }] },
  ]),
}));

describe('Appointments Component', () => {
  beforeEach(() => {
    render(<Appointments />);
  });

  it('should render the heading and initial content', () => {
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
    expect(screen.getByText('Available time slots')).toBeInTheDocument();
    expect(screen.getByText('Each session lasts for 30 minutes')).toBeInTheDocument();
  });

  it('should display loading message when a date is selected', () => {
    fireEvent.click(screen.getByText('2024-11-14'));
    expect(screen.getByText('Loading slots...')).toBeInTheDocument();
  });

  it('should display available slots after loading', async () => {
    fireEvent.click(screen.getByText('2024-11-14'));

    // Wait for the slots to appear
    await screen.findByText('10:00 AM');

    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
  });

  it('should display no slots message if no slots are available for the selected date', async () => {
    // Update the mock to simulate no slots for a specific date
    groupSlotsByDate.mockReturnValueOnce([]);

    fireEvent.click(screen.getByText('2024-11-16'));

    // Wait for the no slots message
    await screen.findByText('No available slots for the selected date.');

    expect(screen.getByText('No available slots for the selected date.')).toBeInTheDocument();
  });

  it('should select a slot when clicked', async () => {
    fireEvent.click(screen.getByText('2024-11-14'));

    // Wait for the slots to appear
    await screen.findByText('10:00 AM');

    fireEvent.click(screen.getByText('10:00 AM'));

    const selectedButton = screen.getByText('10:00 AM');
    expect(selectedButton).toHaveClass('selected');
  });
});