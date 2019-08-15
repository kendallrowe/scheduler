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
        days: state.days.map((day) => {
          if ((!day.appointments.find(a => a === action.id))) {
            return day;
          }
          return {
            ...day,
            spots: day.spots + decreaseSpotsCount
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

export default reducer;

export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SOCKET
};