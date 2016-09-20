const React = require('react');
const ReactDOM = require('react-dom');
const {createStore,combineReducers} = require('redux');
const { Provider } = require('react-redux');

const MapContainer = require('../components/map_container');
const Feed = require('../components/feed');

const App = React.createClass({
  render: function(){
    return (
      <div id="app">
        <MapContainer />
        <Feed />
      </div>
    );
  }
});


const reportsReducer = require('../reducers/reports_reducer');

const store = createStore(combineReducers({
  reports: reportsReducer,
}));  

const ReportsActions = require('../actions/reports_actions');

const pollReports = function(){
  return ReportsActions.index().then(store.dispatch);
}

document.addEventListener("DOMContentLoaded", event => {
  ReactDOM.render(
    <Provider store={store}> 
      <App/> 
    </Provider>,
  document.getElementById('main'));
});

const refreshInterval = 10; //seconds

pollReports(); // right away
setInterval(pollReports,refreshInterval*1000); // continuously