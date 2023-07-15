import { actionTypes } from "../utils/constants";

export const initialState = {
  drivers: [],
  cabs: [],
  searchDrivers:"",
  searchCabs:"",
  isLoggedIn:false,
  login:{name:"",password:""},
};


const { GET_ALL_DRIVERS, SEARCH_DRIVERS, GET_ALL_CABS, SEARCH_CABS, AUTHENTICATION, LOGIN_FIELDS, GUEST_LOGIN } = actionTypes;


export const dataReducer = (state, { type, payload }) => {
  switch (type) {

    case GET_ALL_DRIVERS:
      console.log("the dispatch is getting called with the payload",payload);
      return {...state,drivers:payload};

    case SEARCH_DRIVERS:
      return {...state, searchDrivers:payload};
    
    case GET_ALL_CABS:
      return {...state,cabs:payload}
      
    case SEARCH_CABS:
      return {...state,searchCabs:payload};
     
    case AUTHENTICATION:
      return {...state,isLoggedIn:payload};
     
    case LOGIN_FIELDS:
      return {...state,login:{...state.login,[payload.inputField]:payload.data}};  

    case GUEST_LOGIN:  
      return {...state,login:{...state.login,name:"Admin"},isLoggedIn:true};

    default:
      return state;
  }
};
