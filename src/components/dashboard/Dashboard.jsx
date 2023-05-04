import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import Map, { Marker } from "react-map-gl";
import ResponsiveAppBar from "./module/Navbar.jsx";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import randomPointsOnPolygon from "random-points-on-polygon";
import DrawControl from "./module/draw-control.jsx";
import GeocoderControl from "./module/geocoder-control.jsx";
import "./module/mapbox-gl.css";
import "./module/mapbox-gl-draw.css";
import "./module/mapbox-gl-geocoder.css";

function Dashboard() {
  const [features, setFeatures] = useState({});
  const [open, setOpen] = useState(false);
  const [polygon, setPolygon] = useState([]);
  const [points, setPoints] = useState(3);
  const [viewState, setViewState] = useState(null);
  const [focus, setFocus] = useState("");

  useEffect(() => {
    console.log(polygon);
  }, [polygon]);

  useEffect(() => {
    if (focus !== "") {
      console.log(focus);
      setViewState({
        longitude: polygon[focus]?.coordinates?.[0]?.[0]?.[0],
        latitude: polygon[focus]?.coordinates?.[0]?.[0]?.[1],
      });
      setFocus("");
    }
  }, [focus, polygon]);

  useEffect(() => {
    if (!!viewState) {
      console.log(viewState);
      setTimeout(() => {
        setViewState(null);
      }, 300);
    }
  }, [viewState]);

  useEffect(() => {
    setPolygon(
      Object.keys(features)?.map((val) => ({
        id: val,
        type: "polygon",
        coordinates: [...features[val]?.geometry?.coordinates],
        points: [...randomPointsOnPolygon(points, features[val])],
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [features]);

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const classes = {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
  };

  return (
    <>
      <Box style={{ width: "100vw", height: "100vh" }}>
        <ResponsiveAppBar
          setOpen={setOpen}
          polygon={polygon}
          setViewState={setViewState}
        />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={classes.style}>
            <TextField
              margin="normal"
              required
              type={"number"}
              label="Number of Points"
              name="points"
              value={points}
              onChange={(event) => {
                setPoints(event.target.value > 0 ? event.target.value : 1);
              }}
            />

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Select Polygon</InputLabel>
              <Select
                value={focus}
                label="Polygon"
                onChange={(event) => setFocus(event.target.value)}
              >
                {!!polygon?.length &&
                  polygon?.map((val, index) => (
                    <MenuItem key={index} value={index}>
                      Polygon - {index + 1}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Modal>

        <Map
          initialViewState={{
            longitude: -91.874,
            latitude: 42.76,
            zoom: 12,
          }}
          viewState={
            !!viewState
              ? {
                  longitude: viewState?.longitude,
                  latitude: viewState?.latitude,
                }
              : null
          }
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} //Add Token
        >
          <DrawControl
            position="bottom-left"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
            }}
            defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <GeocoderControl
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            position="top-right"
          />

          {!!polygon?.length &&
            polygon?.map((singlePolygon, index) => (
              <div key={index}>
                {!!singlePolygon &&
                  singlePolygon?.points?.map((point, key) => (
                    <Marker
                      key={key}
                      longitude={point?.geometry?.coordinates[0]}
                      latitude={point?.geometry?.coordinates[1]}
                    />
                  ))}
              </div>
            ))}
        </Map>
      </Box>
    </>
  );
}

export default Dashboard;
