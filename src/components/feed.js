'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { getDateKey } = require('../helpers/date_time_helpers');
const FeedGroup = require('./feed_group')

const Feed = React.createClass({
  render: function(){
    const feedGroups = this.props.reports
      .groupBy(r => {
        return getDateKey(new Date(r.getIn(['properties','created_at'])));
      })
      .sortBy((group, k) => k)
      .reverse()
      .map((group, k) => {
        return <FeedGroup reportGroup={group} key={k}/>
      })
      .toIndexedSeq();

    return (
      <div id="feed">
        <nav>
          <a id="logout" href="#">Logout</a>
        </nav>
        {feedGroups}
      </div>
    )
  }
});

const mapStateToProps = function(state){
  return {
    reports: state.reports
  }
}

module.exports = connect(mapStateToProps)(Feed);
