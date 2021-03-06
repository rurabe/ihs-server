'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { saveRef } = require('../actions/markers_actions');
const { selectId } = require('../actions/active_id_actions');
const { Marker,Popup } = require('react-leaflet');
const { formatDate,formatTime } = require('../helpers/date_time_helpers');

function formatPhone(phone) {
  if (!phone || !phone.length || phone.length !== 10) {
    return '';
  }
  return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`;
}

const ReportMarker = React.createClass({
  onPopupClose: function() {
    this.props.dispatch(selectId(null));
  },
  onClick: function(id) {
    this.props.dispatch(selectId(id));
  },
  ref: function(marker) {
    const id = this.props.report.getIn(['properties','id']);
    marker.leafletElement.on('popupclose',this.onPopupClose);
    this.props.dispatch(saveRef(id,marker.leafletElement));
  },
  render: function(){
    const id = this.props.report.getIn(['properties','id']);
    const position = this.props.report.getIn(['geometry','coordinates'])
      .toJSON()
      .map(parseFloat);
    const dateTime = new Date(this.props.report.getIn(['properties','created_at']));
    const formattedDate = formatDate(dateTime);
    const formattedTime = formatTime(dateTime);
    const name = this.props.report.getIn(['properties','name']) || 'Anonymous';
    const formattedPhone = formatPhone(this.props.report.getIn(['properties','phone']));
    const photoURL = this.props.report.getIn(['properties','photo'])
      || '/assets/images/portrait.png';

    return (
      <Marker position={position} onClick={this.onClick.bind(this,id)} ref={this.ref}>
        <Popup>
          <div className="report-popup">
            <h3>{formattedDate}, {formattedTime}</h3>
            <img src={photoURL} width={300}/>
            <p>{this.props.report.getIn(['properties','description'])}</p>
            <dl>
              <dt>Requested By</dt>
              <dd>{name} <span className="phone">{formattedPhone}</span></dd>
            </dl>
          </div>
        </Popup>
      </Marker>
    );
  }
});

module.exports = connect()(ReportMarker);
