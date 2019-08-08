const getAppointmentsForDay = (state, day) => {  
  const daySelected = state.days.find(d => d.name === day);
  const appointments = daySelected ? daySelected.appointments : [];
  return appointments ? appointments.map(a => state.appointments[`${a}`]) : [];
};

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const foundInterview = {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  };
  return foundInterview;
};

const getInterviewersForDay = (state, day) => {
  const daySelected = state.days.find(d => d.name === day);
  const appointments = daySelected ? daySelected.appointments : [];
  return appointments ? appointments.map(a => state.appointments[`${a}`]) : [];
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };