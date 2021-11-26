let timer;
export default {
    addLoggedUser(context, user) {
        context.commit('storeLoggedUser', user)
    },
    logout(context) {
        clearTimeout(timer);
        context.commit('removeLoggedUser')
    },
    async login(context, payload) {
        let url = `${this.$backendUrl}/login`;
        let formData = new FormData();
        formData.append('email', payload.email);
        formData.append('password', payload.password);
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || 'Failed to authenticate. Check your login data.'
            );
            throw error;
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            context.dispatch('refreshToken');
        }, responseData.expires_in - 60000);
        context.dispatch('addLoggedUser', responseData);
    },
    async register(context, payload) {
        let formData = new FormData();
        formData.append('name', payload.name);
        formData.append('email', payload.email);
        formData.append('password', payload.password);
        let url = `${this.$backendUrl}/register`;
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || 'Failed to authenticate. Check your Register data.'
            );
            throw error;
        }
    },
    async refreshToken(context) {
        let user = context.rootGetters['auth/getLoggedUser'];
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user.access_token);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        const response = await fetch(
            `${this.$backendUrl}/refresh`
            , requestOptions
        );
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || 'Failed to authenticate. Check your login data.'
            );
            throw error;
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            context.dispatch('refreshToken');
        }, parseInt(responseData.expires_in) - 60000);
        context.dispatch('addLoggedUser', responseData);
    },
};
