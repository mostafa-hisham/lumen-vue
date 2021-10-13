export default {
  setUsers(state, payload) {
    state.users = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};