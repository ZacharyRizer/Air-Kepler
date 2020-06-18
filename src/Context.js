import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = (props) => {
  const [depart, setDepart] = useState('');
  const [arrive, setArrive] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [numPass, setNumPass] = useState(1);

  return (
    <Context.Provider
      value={{
        depart,
        setDepart,
        arrive,
        setArrive,
        date,
        setDate,
        numPass,
        setNumPass,
      }}>
      {props.children}
    </Context.Provider>
  );
};
