import { createContext, useContext, useReducer } from "react";
import { dataReducer, initialState } from "../reducers/dataReducer";
import { actionTypes } from "../utils/constants";

import { addDriver, getDriverslistfromAPI, getCabList } from "../services";
import { toast } from "react-hot-toast";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const { GET_ALL_DRIVERS, GET_ALL_CABS, SEARCH_CABS } = actionTypes;


  const getDrivers = async () => {
    try {
      const response = await getDriverslistfromAPI();
      if (response.status === 200) {
        dispatch({ type: GET_ALL_DRIVERS, payload: response.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewDriver = async (driverDetails) => {
    try {
      const response = await addDriver(driverDetails);
      if (response.status === 200) {
        toast.success("New driver added successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getAllCabs= async () =>
  {
    try {
      const response=await getCabList();
      if(response.status===200)
      {
        dispatch({type:GET_ALL_CABS,payload:response.data.data})
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }

  const searchedDrivers=()=>
  {
    const {drivers, searchDrivers}=state;
    return drivers.filter(({name})=>name.toLowerCase().includes(searchDrivers.toLowerCase()));
  }

  const searchedCabs=()=>
  {
    const {cabs,searchCabs}=state;
    return cabs.filter(({name})=>name.toLowerCase().includes(searchCabs.toLowerCase()))
  }

  return (
    <DataContext.Provider value={{ state, dispatch, getDrivers, searchedDrivers, getAllCabs, searchedCabs, addNewDriver }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
