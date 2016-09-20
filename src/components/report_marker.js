'use strict';
const React = require('react');
const { Marker,Popup } = require('react-leaflet');

const ReportMarker = React.createClass({
  render: function(){
    const position = this.props.report.getIn(['geometry','coordinates']).toJSON().map(parseFloat);
    const formattedTime = new Date(this.props.report.getIn(['properties','created_at'])).toLocaleString();
    const phone = this.props.report.getIn(['properties','phone']);
    let phoneNo;
    if(phone){
      phoneNo = <span>, ({phone})</span>
    }
    return (
      <Marker position={position}>
        <Popup>
          <div className="report-popup">
            <h3>{formattedTime}</h3>
            <img src={this.props.report.getIn(['properties','photo'])} width={300}/>
            <p>{this.props.report.getIn(['properties','description'])}</p>
            <p>Reported by: {this.props.report.getIn(['properties','name']) || 'Anonymous'}{phoneNo}</p>
          </div>
        </Popup>
      </Marker>
    );
  }
});

module.exports = ReportMarker;