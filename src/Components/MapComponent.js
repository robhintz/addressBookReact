import React, { Component } from "react";
import {
  Map,
  DistanceMatrixService,
  GoogleApiWrapper,
  Marker,
  InfoWindow,
} from "google-maps-react";

// const AnyReactComponent = ({ text }) => <div className="marker">{text}</div>; old code for google-map=react
const mapStyles = {
  width: "50vh",
  height: "50vh",
};

export class MapComponent extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div className="map">
        <Map
          style={mapStyles}
          google={this.props.google}
          zoom={11}
          initialCenter={{
            lat: 40.5392,
            lng: -105.075,
          }}
          onClick={this.onMapClicked}
        >
          {this.props.addresses.map((address) => {
            return (
              <Marker
                position={{ lat: address.lat, lng: address.lng }}
                onClick={this.onMarkerClick}
                name={address.name}
              />
            );
          })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>

        {/* old code with google-map-react package */}
        {/* <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBQsZkPQSA1EB-NtI02TqQsXadZOXlYEXw",
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.addresses.map((address) => {
            return (
              <AnyReactComponent
                key={address._id}
                lat={address.lat}
                lng={address.lng}
                text={address.name}
              />
            );
          })}
        </GoogleMapReact> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBQsZkPQSA1EB-NtI02TqQsXadZOXlYEXw",
})(MapComponent);
