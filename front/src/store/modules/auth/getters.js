export default {
  getLoggedUser(state) {
      let user = state.loggedUser;
      if(user) {
          user = JSON.parse(user);
      }
      return user;
  },

};