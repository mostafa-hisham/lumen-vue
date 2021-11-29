let timer;
import ResetRequest from '../../../helpers/reset-request';
const resetRequest = new ResetRequest();
export default {
    addLoggedUser(context, user) {
        context.commit('storeLoggedUser', user)
    },
    logout(context) {
        clearTimeout(timer);
        context.commit('removeLoggedUser')
    },
    async login(context, payload) {
        try {
            let url = `${this.$backendUrl}/login`;
            let formData = new FormData();
            formData.append('email', payload.email);
            formData.append('password', payload.password);
            const responseData = await resetRequest.sendRequest(url, 'POST', formData, false);
            clearTimeout(timer);
            timer = setTimeout(function () {
                context.dispatch('refreshToken');
            }, responseData.expires_in - 60000);
            context.dispatch('addLoggedUser', responseData);
        } catch (error) {
            throw new Error(
                error.message || 'Failed to authenticate. Check your login data.'
            );
        }
    },
    async register(context, payload) {
        try {
            let formData = new FormData();
            formData.append('name', payload.name);
            formData.append('email', payload.email);
            formData.append('password', payload.password);
            let url = `${this.$backendUrl}/register`;
            await resetRequest.sendRequest(url, 'POST', formData, false);
        } catch (error) {
            throw new Error(
                error.message || 'Failed to authenticate. Check your Register data.'
            );
        }
    },
    async refreshToken(context) {
        try {
            let url = `${this.$backendUrl}/refresh`;
            const responseData = await resetRequest.sendRequest(url, 'GET', null, true, context);
            clearTimeout(timer);
            timer = setTimeout(function () {
                context.dispatch('refreshToken');
            }, parseInt(responseData.expires_in) - 60000);
            context.dispatch('addLoggedUser', responseData);
        } catch (error) {
            throw new Error(
                error.message || 'Failed to authenticate. Check your login data.'
            );
        }
    },
};
