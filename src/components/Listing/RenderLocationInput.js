import React, { useState } from "react";
import Map from "../Map/MapElement";
import MapPositionSearchBox from "../Map/MapPositionSearchBox";
import MapLocationBox, { MapDataHelper } from "../Map/MapLocationBox";

export const FormMapComponent = ({ updateLocation, ...props }) => {
  let tempFormData = [];
  const [formLocationState, setFormLocationState] = useState([]);
  return (
    <Map>
      <MapPositionSearchBox
        // draggable={true}
        updatevalue={value => {
          tempFormData = MapDataHelper(value);
          setFormLocationState(value);
        }}
        updateLocation={value => {
          updateLocation(value);
        }}
        {...props}
      />
      <MapLocationBox infoValue={formLocationState} />
    </Map>
  );
};
