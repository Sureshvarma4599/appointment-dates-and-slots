import { render, screen } from '@testing-library/react';
import App from './App';  // Import your App component
import Appointments from './components/appointments/appointments'; // Import Appointments

// Mocking Appointments component to avoid deep testing if necessary
jest.mock('./components/appointments/appointments', () => () => <div>Appointments Component</div>);

test('renders Appointments component', () => {
  render(<App />);
  
  // Check if the Appointments component rendered successfully
  const element = screen.getByText(/pick a date/i); // Text we mocked in the Appointments component
  
  expect(element).toBeInTheDocument();
});
