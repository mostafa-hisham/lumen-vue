export default {
  async loadUsers(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `${this.$backendUrl}/users`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const users = responseData;

    context.commit('setUsers', users);
    context.commit('setFetchTimestamp');
  }
};
