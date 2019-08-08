import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: null,
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/days`),
      axios.get(`http://localhost:3001/api/appointments`),
      axios.get('http://localhost:3001/api/interviewers')
    ])
    .then(all => {
      setDays(all[0].data);
      setAppointments(all[1].data);
      setInterviewers(all[2].data);
    })
    .catch(e => {
      console.log(e);
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      return axios.put(`http://localhost:3001/api/appointments/${id}`, appointment)
      .then(response=> {
        setState({
          ...state,
          appointments
        });
        resolve(response);
      })
      .catch(e => {
        reject(e)
      });
    })
  };

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...null }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return new Promise((resolve, reject) => {
      return axios.delete(`http://localhost:3001/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments
        });
        resolve(response);
      })
      .catch(e => {
        reject(e)
      });
    })
    
  };

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
