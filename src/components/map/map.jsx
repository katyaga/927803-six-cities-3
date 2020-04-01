import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import leaflet from "leaflet";
import {getCities, getHoveredCardId} from "../../reduser/offers/selector";

const defaultZoom = 8;
const pinSize = [20, 30];

class Map extends (PureComponent) {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
  }

  componentDidMount() {
    const _map = this._mapRef.current;

    this._map = leaflet.map(_map, {
      defaultZoom,
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
    this._map.eachLayer((layer) => {
      if (layer.options.icon) {
        layer.remove();
      }
    });

    this._fillMap();
  }

  componentWillUnmount() {
    this._map = null;
  }

  _fillMap() {
    const {city, cities, offers, activeOffer, hoveredCardId} = this.props;
    const cityProperties = cities.find((currentCity) => currentCity.name === city);
    const cityCoordinates = cityProperties.location.coordinates;
    const cityZoom = cityProperties.location.zoom;

    this._map.setView(cityCoordinates, cityZoom);

    const icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: pinSize,
    });

    const activeIcon = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: pinSize
    });

    if (offers.length > 0) {
      let markerIcon = icon;

      offers.map((offer) => {
        if (hoveredCardId && offer.id === hoveredCardId) {
          markerIcon = activeIcon;
        }
        leaflet
          .marker(offer.coordinates, {icon: markerIcon})
          .addTo(this._map);

        markerIcon = icon;
      });
    }

    if (activeOffer) {
      leaflet
        .marker(activeOffer.coordinates, {icon: activeIcon})
        .addTo(this._map);
    }
  }

  render() {
    return (
      <div id="map" ref={this._mapRef} style={{height: `100%`}}>
      </div>
    );
  }
}

Map.propTypes = {
  cities: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeOffer: PropTypes.object,
  hoveredCardId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
  hoveredCardId: getHoveredCardId(state),
});

export {Map};
export default connect(mapStateToProps)(Map);
