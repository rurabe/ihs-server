'use strict';
const React = require('react');
const { formatTime } = require('../helpers/date_time_helpers');

const FeedItem = React.createClass({
  render: function(){
    const createdAt = this.props.report.getIn(['properties','created_at']);
    const formattedTime = formatTime(new Date(createdAt))
    const submittedBy = this.props.report.getIn(['properties','name']);

    return (
      <li className="feed-item">
        <time>{formattedTime}</time><small>by</small> {submittedBy}
      </li>
    )
  }
});

module.exports = FeedItem;
