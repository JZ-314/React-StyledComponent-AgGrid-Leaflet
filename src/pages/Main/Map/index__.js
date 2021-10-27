import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

import MainSelect from "../../../components/Select";
import { fetchMainMapData } from "../../../store/main/actions";
import { FETCH_MAIN_MAP_DATA_SUCCESS } from "../../../store/main/constants";

const API_KEY = "AIzaSyBujI7Gh2OZ3XqrJO4eazZtQalv4i2Zo80";

const mapTypes = [
  { label: "objsitecodeorigin", value: "objsitecodeorigin" },
  { label: "objsitecodedestin", value: "objsitecodedestin" },
  { label: "locabbr", value: "locabbr" },
];

export default function MainMap({ params }) {
  const dispatch = useDispatch();

  const [mapType, setMapType] = useState(mapTypes[0].value);
  // const [mapData, setMapData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await dispatch(
        fetchMainMapData({
          type: params.type,
          mapType: mapType,
        })
      );

      if (result.type === FETCH_MAIN_MAP_DATA_SUCCESS) {
        // setMapData(result.payload.data);
        const resMapData = result.payload.data;
        let tempArray = [];

        resMapData.forEach((item) => {
          if (item.gis) {
            if (item.gis.latitude !== "NULL" && item.gis.longitude !== "NULL") {
              const mapItem = {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    parseFloat(item.gis.latitude),
                    parseFloat(item.gis?.longitude),
                  ],
                },
                properties: {
                  count: item.count,
                  objsitecodeorigin: item.Object.objsitecodeorigin,
                  sitecode: item.gis.sitecode,
                },
              };
              tempArray.push(mapItem);
            }
          }
        });
        // setMapData(tempArray);
      }
    }

    fetchData();
  }, [mapType]);

  // const onMapClick = ({ x, y, lat, lng, event }) => {
  //   if (this._googleMap !== undefined) {
  //     const point = new google.maps.LatLng(lat, lng);
  //     this._googleMap.heatmap.data.push(point);
  //   }
  // };

  return (
    <MapWrapper>
      <SelectTypeWrapper>
        <MainSelect
          // options={mapTypes}
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
        />
      </SelectTypeWrapper>
      <HeatMapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={{
            lat: 10.99835602,
            lng: 77.01502627,
          }}
          defaultZoom={11}
          heatmapLibrary={true}
          heatmap={heatMapData}
          // onClick={onMapClick}
        >
          {/* <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </HeatMapWrapper>
    </MapWrapper>
  );
}

const heatMapData = {
  positions: [
    { lat: 55.5, lng: 34.56 },
    { lat: 34.7, lng: 28.4 },
  ],
  options: {
    radius: 20,
    opacity: 0.6,
  },
};

const MapWrapper = styled.div`
  height: 65vh;
  width: 100%;
`;

const SelectTypeWrapper = styled.div`
  margin-bottom: 20px;
`;

const HeatMapWrapper = styled.div`
  width: 100%;
  height: 500px;
  background: #eee;
`;
