export default {
    async loadCompatibilities(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        let user = context.rootGetters['auth/getLoggedUser'];
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.access_token);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        const response = await fetch(
            `${this.$backendUrl}/rucss-safelist?search=${payload.search}&page=${payload.page}`
            , requestOptions
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to to get Data! Please login');
            throw error;
        }
        context.commit('setCompatibilities', responseData);
        context.commit('setFetchTimestamp');
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
        let user = context.rootGetters['auth/getLoggedUser'];
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.access_token);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        const response = await fetch(`${this.$backendUrl}/rucss-safelist/${compatibility_id}`, requestOptions);
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }
        return responseData;
    },
    async addNewCompatibility(context, compatibilityData) {
        let user = context.rootGetters['auth/getLoggedUser'];
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.access_token);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: compatibilityData
        };
        const response = await fetch(`${this.$backendUrl}/rucss-safelist/new`, requestOptions);

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to Add!');
            throw error;
        }
        context.commit('addCompatibility', {
            ...responseData,
        });

    },
    async editCompatibility(context, compatibilityData) {
        let user = context.rootGetters['auth/getLoggedUser'];
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.access_token);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: compatibilityData.formData
        };
        const response = await fetch(`${this.$backendUrl}/rucss-safelist/edit/${compatibilityData.id}`, requestOptions);

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to Add!');
            throw error;
        }
        context.commit('updateCompatibility', {
                "compatibility_id": compatibilityData.id,
                "data": responseData
            }
        );
    },
    async deleteCompatibility(context, compatibility_id) {
        let user = context.rootGetters['auth/getLoggedUser'];
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.access_token);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
        };
        const response = await fetch(`${this.$backendUrl}/rucss-safelist/delete/${compatibility_id}`, requestOptions);

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to Add!');
            throw error;
        }
        context.commit('removeCompatibility',  compatibility_id,);
    }


};
