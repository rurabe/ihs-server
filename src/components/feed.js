'use strict';
const React = require('react');
const { connect } = require('react-redux');
const FeedItem = require('./feed_item')

const Feed = React.createClass({
  render: function(){
    const feedItems = this.props.reports.toIndexedSeq()
      .sortBy(r => r.getIn(['properties','created_at']))
      .reverse()
      .map(r => {
        return <FeedItem report={r} key={r.getIn(['properties','id'])}/>;
      });

    return (
      <div id="feed">
        <nav>
          <a id="logout" href="#">Logout</a>
        </nav>
        <ul>
          {feedItems}
        </ul>
      </div>
    )
  }
});

const mapStateToProps = function(state){
  return {
    reports: state.reports,
  }
}

module.exports = connect(mapStateToProps)(Feed);
