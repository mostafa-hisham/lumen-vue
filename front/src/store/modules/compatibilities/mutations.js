export default {
    setCompatibilities(state, payload) {
        state.compatibilities = payload;
    },
    addCompatibility(state, payload) {
        state.compatibilities.data.unshift(payload);
    },
    updateCompatibility(state, payload) {
        const compatibility_index = state.compatibilities.data.findIndex((compatibility =>
            compatibility.id === payload.compatibility_id)
        );
        state.compatibilities.data[compatibility_index] = payload.data;
    },
    removeCompatibility(state, payload) {
        const compatibility_index = state.compatibilities.data.findIndex((compatibility =>
            compatibility.id === payload)
        );
        state.compatibilities.data.splice(compatibility_index, 1);
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    },
    storeSelectedCompatibility(state, compatibility) {
        localStorage.setItem('selectedCompatibility', JSON.stringify(compatibility));
        state.selectedCompatibility = JSON.stringify(compatibility);
    },
};