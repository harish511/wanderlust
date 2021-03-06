import React, { Component } from 'react';
import LocationList from './locations/LocationList'
import ViewSwitch from './controls/ViewSwitch';

const style = {
  margin: '2em auto 0 auto',
  width: '500px',
  maxWidth: '100%',
  textAlign: 'center',
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: props.store,
      actions: props.actions,
      storeState: props.store.getState(),
      view: 'all',
    };

    props.store.subscribe(() => {
      this.setState({
        storeState: props.store.getState()
      })
    });

    props.actions.initializeApp();
  }

  viewSwitch = (view, displayName) =>
    <ViewSwitch
      onSelect={() => this.setState({view})}
      active={this.state.view === view}
    >{displayName}</ViewSwitch>

  locationsForView = () => {
    switch(this.state.view) {
      case 'all':
        return this.state.storeState.locations;
      case 'favorites':
        return this.state.storeState.locations
          .filter(location => location.favorite);
      default:
        throw(new Error('Unknown view: ' + this.state.view));
    }
  }

  render = () =>
    <div className="App" style={style}>
      <h1>wanderlust</h1>
      <div>
        {this.viewSwitch('all', 'All')}
        {this.viewSwitch('favorites', 'Favorites')}
      </div>

      <LocationList
        locations={this.locationsForView()}
        actions={this.state.actions}
      />
    </div>;
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
};

export default App;
