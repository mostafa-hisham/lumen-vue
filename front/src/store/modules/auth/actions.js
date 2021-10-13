export default {
    addLoggedUser(context, user) {
        context.commit('storeLoggedUser', user)
    },
    logout(context) {
        context.commit('removeLoggedUser')
    },
    async login(context, payload) {
        let url = `${this.$backendUrl}/login`;
        let formData = new FormData();
        formData.append('email', payload.email);
        formData.append('password', payload.password);
        const response = await fetch(url, {
            method: 'POST',
            body:formData
        });

        const responseData = await response.json();

        console.log('login');
        console.log(responseData);
        if (!response.ok) {
            const error = new Error(
                responseData.message || 'Failed to authenticate. Check your login data.'
            );
            throw error;
        }
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
            body:formData
        });
        const responseData = await response.json();
        if (!response.ok) {
            const error = new Error(
                responseData.message || 'Failed to authenticate. Check your Register data.'
            );
            throw error;
        }
    },
};
