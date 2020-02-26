import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {cities} from "../../mocks/cities";

class Map extends (PureComponent) {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  componentDidMount() {
    const city = `Amsterdam`;
    const _map = this._mapRef.current;

    const cityCoordinates = cities.find((x) => x.city === city).coordinates;

    const {offers} = this.props;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = leaflet.map(_map, {
      center: cityCoordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(cityCoordinates, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    offers.map((offer) => {
      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(map);
    });
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}>
      </div>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
