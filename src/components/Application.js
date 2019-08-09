import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import { useApplicationData } from "../../hooks/useApplicationData";

export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewersForDay = getInterviewersForDay(state, state.day)
  let schedule=[];
  if (appointments && appointments[0] && state.interviewers) {
    schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
      
      return (
        <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        />
      );
    });
  }
    
    return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu" >
            <DayList
              days={state.days}
              day={state.day}
              setDay={day => setDay(day)}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}
