import React, { createContext, useState, useContext } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  return useContext(LocationContext);
}

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}
