import React from "react";
import axios from "axios";

import { render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText,
  queryByText,
  prettyDOM,
  getByDisplayValue,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Form", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))
    
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING"));
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElementToBeRemoved(() =>  getByText(appointment, "SAVING"));
    
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(d => 
      queryByText(d, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the first booked appointment (Archie Cohen).
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(a => 
      queryByText(a, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 4. Check that the element with the text "Delete the appointment?" is displayed.
    expect(getByText(appointment, "Delete the appointment?"));

    // 5. Click the "Confirm" button.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "DELETING" is displayed.
    expect(getByText(appointment, "DELETING"));
    
    // 7. Wait until that the element with the button "ADD" is displayed.
    await waitForElementToBeRemoved(() =>  getByText(appointment, "DELETING"));
    expect(getByAltText(appointment, "Add"));
    // 8.  Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(d => 
      queryByText(d, "Monday")
    );
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))

    // 3. Click the "Edit" button on the first booked appointment (Archie Cohen).
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(a => 
      queryByText(a, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Check that the element with the display value "Archie Cohen" in the input is displayed.
    expect(getByDisplayValue(appointment, 'Archie Cohen'));

    // 5. Replace value with the name "Lydia Miller-Jones" into the input with the display value "Archie Cohen"
    fireEvent.change(getByDisplayValue(appointment, 'Archie Cohen'), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 6. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 7. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 8. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING"));
    
    // 9. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElementToBeRemoved(() =>  getByText(appointment, "SAVING"));
    
    // 10. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(d => 
      queryByText(d, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"))
    
    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "SAVING"));
    
    // 8. Wait until the element with the text "Oops! Looks like there was an issue saving appointment on our end. Try again and contact support if the issue continues." is displayed.
    await waitForElementToBeRemoved(() =>  getByText(appointment, "SAVING"));
    expect(getByText(appointment, "Oops! Looks like there was an issue saving appointment on our end. Try again and contact support if the issue continues."));
    
    // 9. Click the "Close" button on the error message
    fireEvent.click(getByAltText(appointment, "Close"));

    // 10. Check that the empty form with input with the placeholder "Enter Student Name" is displayed.
    expect(getByPlaceholderText(appointment, /Enter Student Name/i));

    // 11.. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(d => 
      queryByText(d, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the "Delete" button on the first booked appointment (Archie Cohen).
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(a => 
      queryByText(a, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    // 4. Check that the element with the text "Delete the appointment?" is displayed.
    expect(getByText(appointment, "Delete the appointment?"));
    
    // 5. Click the "Confirm" button.
    fireEvent.click(getByText(appointment, "Confirm"));
    
    // 6. Check that the element with the text "DELETING" is displayed.
    expect(getByText(appointment, "DELETING"));
    
    // 7. Wait until that the element with the error message "Could not delete appointment." is displayed.
    await waitForElementToBeRemoved(() =>  getByText(appointment, "DELETING"));
    expect(getByText(appointment, "Could not delete appointment."));

    // 8. Click the "Close" button on the error message
    fireEvent.click(getByAltText(appointment, "Close"));

    // 9. Check that the element with the display value "Archie Cohen" is displayed.
    expect(getByText(appointment, 'Archie Cohen'));

    // 10. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(d => 
      queryByText(d, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    

  });
});