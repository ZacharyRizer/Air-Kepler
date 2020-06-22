import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = (props) => {
  const [depart, setDepart] = useState('');
  const [arrive, setArrive] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState({});
  const [numPass, setNumPass] = useState(1);
  const [price, setPrice] = useState({});
  const [flightClass, setFlightClass] = useState('Economy');

  return (
    <Context.Provider
      value={{
        depart,
        setDepart,
        arrive,
        setArrive,
        date,
        setDate,
        distance,
        setDistance,
        time,
        setTime,
        numPass,
        setNumPass,
        price,
        setPrice,
        flightClass,
        setFlightClass,
      }}>
      {props.children}
    </Context.Provider>
  );
};
