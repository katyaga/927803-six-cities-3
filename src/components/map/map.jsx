import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {cities} from "../../mocks/cities";

const zoom = 12;

class Map extends (PureComponent) {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
  }

  componentDidMount() {
    const _map = this._mapRef.current;

    this._map = leaflet.map(_map, {
      zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    this._fillMap();
  }

  componentDidUpdate() {
    this._fillMap();
  }

  componentWillUnmount() {
    this._map = null;
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}>
      </div>
    );
  }

  _fillMap() {
    const {city, offers, activeOffer} = this.props;
    const cityCoordinates = cities.find((x) => x.name === city).coordinates;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [20, 30]
    });

    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [20, 30]
    });

    this._map.setView(cityCoordinates, zoom);

    const markers = offers.map((offer) => {
      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(this._map);
    });

    if (activeOffer) {
      markers.push(leaflet
        .marker(activeOffer.coordinates, {activeIcon})
        .addTo(this._map));
    }
  }
}

Map.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeOffer: PropTypes.object,
};

export default Map;
