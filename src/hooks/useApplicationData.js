import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

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
  return { 
    state,
    setDay,
    bookInterview,
    deleteInterview 
  };
}

export { useApplicationData }
