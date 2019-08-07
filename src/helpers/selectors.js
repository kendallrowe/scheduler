const getAppointmentsForDay = (state, day) => {
  console.log("state in function: ", state);
  
  const daySelected = state.days.find(d => d.name === day);
  console.log("day selected: ", daySelected);
  const appointments = daySelected ? daySelected.appointments : [];
  console.log(appointments);
  return appointments ? appointments.map(a => state.appointments[`${a}`]) : [];
};

export { getAppointmentsForDay };