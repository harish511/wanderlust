export default {

  RECEIVED_LOCATIONS: (state, message) => {
    state.locations = message.locations;
  },

  DISCARD_LOCATION: (state, message) => {
    state.locations = state.locations.filter(location => location.id !== message.id);
  },

  FAVORITE_LOCATION: (state, message) => {
    state.locations
      .find(location => location.id === message.id)
      .favorite = true;
  },

  UNFAVORITE_LOCATION: (state, message) => {
    state.locations
      .find(location => location.id === message.id)
      .favorite = false;
  },
}
