import React, { useState } from "react";
import PropTypes from "prop-types";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapMoney = (props) => {
  const position = {
    lat: props.latitude ? props.latitude : 41,
    lng: props.longitude ? props.longitude : 29,
  };
  const [latitude, mapSetLatitude] = useState(props.latitude ? props.latitude : 41);
  const [longitude, mapSetLongitude] = useState(props.longitude ? props.longitude : 29);
  const { setLatitude, setLongitude, trackMaps, liveMarkers, addMarker, isLiveMarker } = props;
  const bounds = new window.google.maps.LatLngBounds();

  const renderAddMarker = () => {
    if (addMarker) {
      return (
        <Marker
          position={position}
          draggable={!!props.draggable}
          onDragEnd={(e) => {
            setLatitude(e.latLng.lat());
            setLongitude(e.latLng.lng());
            mapSetLatitude(e.latLng.lat());
            mapSetLongitude(e.latLng.lng());
          }}
        />
      );
    } else {
      return undefined;
    }
  };
  const renderLiveMarkers = (markers) => {
    if (markers.length !== 0) {
      return markers.map((marker, index) => {
        const lat = marker.lastFound.latitude;
        const lng = marker.lastFound.longitude;
        const latLng = new window.google.maps.LatLng(lat, lng);
        bounds.extend(latLng);

        return <Marker key={index} position={{ lat: lat, lng: lng }} draggable={false} />;
      });
    }
  };

  const renderMarkes = (markers) => {
    return markers.map((marker, index) => {
      const lat = marker.location.latitude;
      const lng = marker.location.longitude;
      const latLng = new window.google.maps.LatLng(lat, lng);
      bounds.extend(latLng);
      return (
        <Marker
          key={index}
          label={(index + 1).toString()}
          position={{
            lat: marker.location.latitude,
            lng: marker.location.longitude,
          }}
          draggable={false}
        />
      );
    });
  };

  return (
    <div>
      <GoogleMap defaultZoom={14} center={new window.google.maps.LatLng(latitude, longitude)}>
        {isLiveMarker ? renderLiveMarkers(liveMarkers) : undefined}

        {renderAddMarker()}

        {renderMarkes(trackMaps)}
      </GoogleMap>
    </div>
  );
};

MapMoney.propType = {
  setLatitude: PropTypes.func,
  setLongitude: PropTypes.func,
  trackMaps: PropTypes.array,
  liveMarkers: PropTypes.array,
  addMarker: PropTypes.bool,
  isLiveMarker: PropTypes.bool,
};
MapMoney.defaultProps = {
  setLatitude: () => undefined,
  setLongitude: () => undefined,
  trackMaps: [],
  liveMarkers: [],
  addMarker: false,
  isLiveMarker: false,
};

export default withScriptjs(withGoogleMap(MapMoney));
