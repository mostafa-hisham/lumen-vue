export default {
    storeLoggedUser(state, user) {
        let now = new Date();
        let expiryDate = new Date();
        user.expiryDate = expiryDate.setTime(now.getTime() + user.expires_in * 1000);

        localStorage.setItem('loggedUser', JSON.stringify(user));
        state.loggedUser = JSON.stringify(user);
    },
    removeLoggedUser(state) {
        state.loggedUser = null;
        localStorage.removeItem('loggedUser');
    }
};