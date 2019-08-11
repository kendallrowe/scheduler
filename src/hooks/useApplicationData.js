// eslint-disable-next-line
import React, { useEffect, useReducer } from "react";
import axios from "axios";

const useApplicationData = () => {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SOCKET = "SET_SOCKET";
  const SEND_MESSAGE = "SEND_MESSAGE";

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state, 
          day: action.day
        };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        };
      case SET_INTERVIEW: {

        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview
        };
    
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        let decreaseSpotsCount = 0;
        if (!state.appointments[action.id].interview && action.interview) {
          decreaseSpotsCount = -1;
        } 

        if (state.appointments[action.id].interview && !action.interview) {
          decreaseSpotsCount = 1;
        }
        
        return {
          ...state,
          appointments,
          days: state.days.map((item) => {
            if (item.id !== appointment.day_id) {
              return item;
            }

            return {
              ...item,
              spots: item.spots + decreaseSpotsCount
            };
          })
        };
      }
      case SET_SOCKET:
        return {
          ...state,
          socket: action.socket
        };
      case SEND_MESSAGE:
          state.socket.send(action.message);
          return state;
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewer: null,
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/api/days`),
      axios.get(`http://localhost:3001/api/appointments`),
      axios.get('http://localhost:3001/api/interviewers')
    ])
    .then(all => {
      dispatch({
        type: SET_APPLICATION_DATA, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      });
    })
    .catch(e => {
      console.log(e);
    });

    // Socket Connection
    // Web Socket connection on load
    const ws = new WebSocket('ws://localhost:3001');
    dispatch({type: SET_SOCKET, socket: ws});
    ws.addEventListener('open', () => {
      console.log("opened websocket");
    });
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
      

      return axios.put(`http://localhost:3001/api/appointments/${id}`, appointment)
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
      return axios.delete(`http://localhost:3001/api/appointments/${id}`)
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
