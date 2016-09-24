'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { selectId } = require('../actions/active_id_actions');
const { formatTime } = require('../helpers/date_time_helpers');

const FeedItem = React.createClass({
  onClick: function(id) {
    this.props.dispatch(selectId(id));
    const { markers } = this.props;
    if (markers[id]) markers[id].openPopup();
  },
  render: function(){
    const id = this.props.report.getIn(['properties','id']);
    const isActive = this.props.activeId && this.props.activeId === id;
    const className = 'feed-item' + (isActive ? ' selected' : '');
    const createdAt = this.props.report.getIn(['properties','created_at']);
    const formattedTime = formatTime(new Date(createdAt))
    const submittedBy = this.props.report.getIn(['properties','name']);

    return (
      <li className={className} onClick={this.onClick.bind(this,id)}>
        <time>{formattedTime}</time><small>by</small> {submittedBy}
      </li>
    )
  }
});

const mapStateToProps = function(state){
  return {
    markers: state.markers,
    activeId: state.activeId
  }
}

module.exports = connect(mapStateToProps)(FeedItem);
