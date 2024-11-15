import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Appointments from "./appointments"; // Adjust the path as needed

jest.mock("../../data/slots.json", () => ({
  __esModule: true,
  default: [
    {
      displayDate: "2024/08/02",
      displayTime: "07:30AM",
      displayTimeEnd: "08:00AM",
      startTimeUtc: 1722564000,
      endTimeUtc: 1722565800,
    },
    {
      displayDate: "2024/08/02",
      displayTime: "08:00AM",
      displayTimeEnd: "08:30AM",
      startTimeUtc: 1722565800,
      endTimeUtc: 1722567600,
    },
  ],
}));

jest.mock("../../utils/utils", () => ({
  groupSlotsByDate: jest.fn(() => [
    {
      date: "2024/08/02",
      slots: [
        {
          displayDate: "2024/08/02",
          displayTime: "07:30AM",
          displayTimeEnd: "08:00AM",
          startTimeUtc: 1722564000,
          endTimeUtc: 1722565800,
        },
        {
          displayDate: "2024/08/02",
          displayTime: "08:00AM",
          displayTimeEnd: "08:30AM",
          startTimeUtc: 1722565800,
          endTimeUtc: 1722567600,
        },
      ],
    },
    { date: "2024/08/05", slots: [] },
  ]),
}));

describe("Appointments Component", () => {
  beforeEach(() => {
    render(<Appointments />);
  });

  it("should render the heading and initial content", () => {
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
    expect(screen.getByText("Available time slots")).toBeInTheDocument();
    expect(
      screen.getByText("Each session lasts for 30 minutes")
    ).toBeInTheDocument();
  });
});
