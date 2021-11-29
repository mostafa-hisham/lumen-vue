export default class ResetRequest {

    async sendRequest(url, method = 'GET', formData = null, auth = false, vue_context = null) {
        let requestOptions = {
            method: method,
            redirect: 'follow',
        };
        if (auth) {
            let user = vue_context.rootGetters['auth/getLoggedUser'];
            let myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + user.access_token);
            requestOptions.headers = myHeaders;
        }
        if (formData) {
            requestOptions.body = formData;
        }

        const response = await
            fetch(
                url,
                requestOptions
            );
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(
                responseData.message
            );
        }
        return responseData;
    }

}