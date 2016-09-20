'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { Map,TileLayer } = require('react-leaflet');

const ReportMarker = require('./report_marker');

const MapContainer = React.createClass({
  render: function(){

    let markers = this.props.reports.toIndexedSeq().map(r => {
      return <ReportMarker report={r} key={r.getIn(['properties','id'])}/>;
    });

    let center = [21.476457, -157.974944]; // approx center of oahu
    let zoom = 11; // should show whole island on most desktop resolutions

    return <div id="map">
      <Map center={center} zoom={zoom}>
        <TileLayer 
          url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token={accessToken}"
          attribution='&copy; Mapbox, &copy; OpenStreetMap'
          accessToken="@@MAPBOX_ACCESS_TOKEN"
        />
        {markers}
      </Map>
    </div>
  }
});

const mapStateToProps = function(state){
  return {
    reports: state.reports,
  }
}

module.exports = connect(mapStateToProps)(MapContainer);