'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { formatDate,formatWeekday } = require('../helpers/date_time_helpers');
const FeedItem = require('./feed_item')

const FeedGroup = React.createClass({
  render: function(){
    const date = new Date(
      this.props.reportGroup.first().getIn(['properties','created_at'])
    );
    const feedItems = this.props.reportGroup.toIndexedSeq()
      .sortBy(r => r.getIn(['properties','created_at']))
      .reverse()
      .map(r => {
        return <FeedItem report={r} key={r.getIn(['properties','id'])}/>;
      });

    return (
      <div className="feed-group">
        <h3 className="date">{formatDate(date)}
          <small className="weekday">{formatWeekday(date)}</small>
        </h3>
        <ul>
          {feedItems}
        </ul>
      </div>
    )
  }
});

module.exports = FeedGroup;
