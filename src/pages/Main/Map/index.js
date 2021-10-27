import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Map as LeafletMap,
  TileLayer,
  LayersControl,
  Marker,
  Circle,
  Pane,
  Popup,
  useLeaflet,
} from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import "leaflet/dist/leaflet.css";

import MainSelect from "../../../components/Select";
import ReactSpinner from "../../../components/Loader/ReactSpinner";
import { fetchMainMapData } from "../../../store/main/actions";
import { FETCH_MAIN_MAP_DATA_SUCCESS } from "../../../store/main/constants";

const mapTypes = [
  { label: "objsitecodeorigin", value: "objsitecodeorigin" },
  { label: "objsitecodedestin", value: "objsitecodedestin" },
  { label: "locabbr", value: "locabbr" },
  { label: "codereg", value: "codereg" },
];

export default function CustomMap() {
  const dispatch = useDispatch();
  const { map } = useLeaflet();
  const resSelectParams = useSelector((state) => state.search.params);

  const [isLoading, setIsLoading] = useState(true);
  const [mapType, setMapType] = useState(mapTypes[0].value);
  const [mapData, setMapData] = useState(null);
  const [mapState] = useState({
    lat: 12.9716,
    lng: 77.5946,
    zoom: 5,
    position: [20.937543, -89.495554],
    gradient: { 0.4: "yellow", 0.8: "orange", 1.0: "red" },
  });

  useEffect(() => {
    // map.getPane("labels").style.pointerEvents = "none";
  }, [map]);

  useEffect(() => {
    const params = localStorage.getItem("landingParams");

    async function fetchData() {
      const result = await dispatch(
        fetchMainMapData({
          type: JSON.parse(params).type,
          mapType,
          data: resSelectParams ? resSelectParams.data : [],
          search_type: "text",
        })
      );

      if (result.type === FETCH_MAIN_MAP_DATA_SUCCESS) {
        setMapData(result.payload.data);
        const resMapData = result.payload.data;
        let tempArray = [];

        resMapData.forEach((item) => {
          if (item.gis) {
            if (item.gis.latitude !== "NULL" || item.gis.longitude !== "NULL") {
              // if (item.gis.longitude < -150) {
              const mapItem = {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [
                    parseFloat(item.gis?.longitude),
                    parseFloat(item.gis.latitude),
                  ],
                },
                properties: {
                  count: item.count,
                  objsitecodeorigin: item.Object.objsitecodeorigin,
                  sitecode: item.gis.sitecode,
                },
              };
              tempArray.push(mapItem);
              // }
            }
          }
        });
        setMapData(tempArray);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [mapType, resSelectParams]);

  const handleClickMayType = (e) => {
    setMapType(e.target.value);
    setIsLoading(true);
  };

  return (
    <MapWrapper>
      <SelectTypeWrapper>
        <MainSelect
          options={mapTypes}
          value={mapType}
          onChange={handleClickMayType}
        />
      </SelectTypeWrapper>
      {isLoading ? (
        <ReactSpinner loading={isLoading} />
      ) : (
        <HeatMapWrapper>
          <LeafletMap
            center={mapState.position}
            zoom={mapState.zoom}
            scrollWheelZoom={true}
          >
            <LayersControl position="topright" collapsed={true}>
              {mapData && (
                <>
                  <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    points={mapData}
                    longitudeExtractor={(m) => m.geometry?.coordinates[0]}
                    latitudeExtractor={(m) => m.geometry?.coordinates[1]}
                    intensityExtractor={(m) =>
                      parseFloat(m.geometry.coordinates[1])
                    }
                    max={10}
                    blur={15}
                    minOpacity={0.4}
                    gradient={mapState.gradient}
                  />
                  {mapData.map((item, index) => (
                    <Fragment key={index}>
                      <Pane
                        name={item.properties?.sitecode}
                        style={{ zIndex: 100 }}
                        key={index}
                      >
                        <Circle
                          center={item.geometry.coordinates}
                          radius={200}
                        />
                      </Pane>
                    </Fragment>
                  ))}
                </>
              )}
              <LayersControl.BaseLayer name="Firefly" checked>
                <TileLayer
                  // url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}"
                  attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  // url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
                  maxNativeZoom={8}
                  ext="png"
                />
              </LayersControl.BaseLayer>
              <Marker position={[-89.495554, 20.937543]}>
                <Popup>
                  <span>Hello</span>
                </Popup>
              </Marker>
            </LayersControl>
          </LeafletMap>
        </HeatMapWrapper>
      )}
    </MapWrapper>
  );
}
// const geojson = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [77.75659494, 12.96821717],
//       },
//       properties: {
//         rating: 3.2,
//         restaurant_name: "Sonu Da Dhaba",
//       },
//     },
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [77.76178066, 12.98185298],
//       },
//       properties: {
//         rating: 3.8,
//         restaurant_name: "S.K Fast Food & Tiffin Centre",
//       },
//     },
//     {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [77.680669, 12.912396],
//       },
//       properties: {
//         rating: 2.6,
//         restaurant_name: "House Boat",
//       },
//     },
//   ],
// };

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

  .leaflet-container {
    width: 100%;
    height: 500px;
  }

  .leaflet-popup-pane {
    display: none;
    visibility: hidden;
  }
`;
