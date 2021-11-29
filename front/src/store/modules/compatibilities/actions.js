import ResetRequest from '../../../helpers/reset-request';

const resetRequest = new ResetRequest();
export default {
    async loadCompatibilities(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        try {
            let url = `${this.$backendUrl}/rucss-safelist?search=${payload.search}&page=${payload.page}`;

            const responseData = await resetRequest.sendRequest(url, 'GET', null, true, context);
            context.commit('setCompatibilities', responseData);
            context.commit('setFetchTimestamp');
        } catch (error) {
            throw new Error(
                error.message || 'Failed to get Data! Please login.'
            );
        }
    },

    async selectCompatibility(context, compatibility_id) {
        await context.dispatch('addSelectedCompatibility', compatibility_id);
    },

    async addSelectedCompatibility(context, compatibility_id) {
        let compatibility = null;
        if (context.rootGetters['compatibilities/compatibilities'].data != null) {
            compatibility = context.rootGetters['compatibilities/compatibilities'].data.find(
                (compatibility) => compatibility.id.toString() === compatibility_id.toString()
            );
        }
        if (compatibility === null) {
            const storage_compatibility = context.rootGetters['compatibilities/getSelectedCompatibility'];
            if (compatibility_id !== storage_compatibility.id) {
                compatibility = await context.dispatch('loadSingleCompatibility', compatibility_id);
            } else {
                compatibility = storage_compatibility;
            }
        }
        if (compatibility !== null) {
            await context.commit('storeSelectedCompatibility', compatibility)
        }
    },

    async loadSingleCompatibility(context, compatibility_id) {
        try {
            let url = `${this.$backendUrl}/rucss-safelist/${compatibility_id}`;
            return await resetRequest.sendRequest(url, 'GET', null, true, context);
        } catch (error) {
            throw new Error(
                error.message || 'Failed to get Data! Please login.'
            );
        }
    },
    async addNewCompatibility(context, compatibilityData) {
        try {
            let url = `${this.$backendUrl}/rucss-safelist/new`;
            const responseData = await resetRequest.sendRequest(url, 'POST', compatibilityData, true, context);
            context.commit('addCompatibility', {
                ...responseData,
            });
        } catch (error) {
            throw new Error(
                error.message || 'Failed to add! Please login.'
            );
        }
    },
    async editCompatibility(context, compatibilityData) {
        try {
            let url = `${this.$backendUrl}/rucss-safelist/edit/${compatibilityData.id}`;
            const responseData = await resetRequest.sendRequest(url, 'POST', compatibilityData.formData, true, context);
            context.commit('updateCompatibility', {
                    "compatibility_id": compatibilityData.id,
                    "data": responseData
                }
            );
        } catch (error) {
            throw new Error(
                error.message || 'Failed to edit! Please login.'
            );
        }
    },
    async deleteCompatibility(context, compatibility_id) {

        try {
            let url = `${this.$backendUrl}/rucss-safelist/delete/${compatibility_id}`;
            await resetRequest.sendRequest(url, 'POST', null, true, context);
            context.commit('removeCompatibility', compatibility_id,);
        } catch (error) {
            throw new Error(
                error.message || 'Failed to Delete! Please login.'
            );
        }
    }


};
