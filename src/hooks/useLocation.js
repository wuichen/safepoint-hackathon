// Hook (use-location.js)
import React, { useState, useEffect, useContext, createContext } from "react";
import { DEFAULT_IP_DATA, IPDATA_API_KEY } from "../constants/data";
import useFetch from "use-http";

const locationContext = createContext();

// Provider component that wraps your app and makes location object ...
// ... available to any child component that calls useLocation().
export function ProvideLocation({ children }) {
  const location = useProvideLocation();
  return (
    <locationContext.Provider value={location}>
      {children}
    </locationContext.Provider>
  );
}

// Hook for child components to get the location object ...
// ... and re-render when it changes.
export const useLocation = () => {
  return useContext(locationContext);
};

// Provider hook that creates location object and handles state
function useProvideLocation() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [ipData, setIpData] = useState(DEFAULT_IP_DATA);
  const [center, setCenter] = useState(null);
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(storePosition);
  };
  const storePosition = position => {
    setCurrentLocation(true);
    setCenter([position.coords.longitude, position.coords.latitude]);
  };

  const getIpData = async () => {
    const response = await fetch(
      `https://api.ipdata.co?api-key=${IPDATA_API_KEY}`
    );
    const json = await response.json();
    setIpData(json);

    return json;
  };

  // Return the user object and location methods
  return {
    getCurrentPosition,
    getIpData,
    center,
    ipData
  };
}
