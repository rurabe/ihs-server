'use strict';
const React = require('react');

const FeedItem = React.createClass({
  render: function(){

    const formattedTime = new Date(this.props.report.getIn(['properties','created_at'])).toLocaleString();

    return (
      <li className="feed-item">
        {formattedTime} - {this.props.report.getIn(['properties','description'])}
      </li>
    )
  }
});


module.exports = FeedItem;