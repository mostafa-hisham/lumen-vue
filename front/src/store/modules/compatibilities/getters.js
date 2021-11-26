export default {
    compatibilities(state) {
        return state.compatibilities;
    },
    hasCompatibilities(state) {
        return (state.compatibilities && state.compatibilities.data && state.compatibilities.data.length > 0);
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    },
    getSelectedCompatibility(state) {
        let compatibility = state.selectedCompatibility;
        if (compatibility) {
            compatibility = JSON.parse(compatibility);
        }
        return compatibility;
    },

};