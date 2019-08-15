// eslint-disable-next-line
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SOCKET
} from "../reducers/application";

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: null,
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get('/api/interviewers')
    ])
    .then(all => {
      dispatch({
        type: SET_APPLICATION_DATA, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      });
    });

    // Socket Connection
    // Web Socket connection on load
    const ws = new WebSocket("wss://kr-scheduler-lhl.herokuapp.com");
    dispatch({type: SET_SOCKET, socket: ws});

    ws.addEventListener('message', (event) => {
      dispatch(JSON.parse(event.data));
    });
    return () => { ws.close(); };
  }, []);

  const setDay = day => dispatch(({ type: SET_DAY, day }));
  
  const bookInterview = (id, interview) => {
    return new Promise((resolve, reject) => {

      if (!interview.interviewer || interview.student === "") {
        return reject();
      }

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      
      return axios.put(`/api/appointments/${id}`, appointment)
      .then(response=> {
        dispatch({
          type: SET_INTERVIEW, 
          id, 
          interview 
        })
        resolve(response);
      })
      .catch(e => {
        reject(e)
      });
    })
  };

  const deleteInterview = (id) => {
    return new Promise((resolve, reject) => {
      return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        dispatch({ 
          type: SET_INTERVIEW, 
          id, 
          interview: null 
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
