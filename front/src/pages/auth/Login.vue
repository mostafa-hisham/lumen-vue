<template>
    <section>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <h2>Login</h2>
            <login-form @save-data="saveData"></login-form>
            <br/>
            <base-button mode="outline" link to="/register">Register</base-button>
        </base-card>
    </section>
</template>

<script>
    import LoginForm from '../../components/auth/LoginForm.vue';

    export default {
        data() {
            return {
                isLoading: false,
                error: null,
            };
        },
        components: {
            LoginForm,
        },
        methods: {
            async saveData(data) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('auth/login', data);
                    this.$router.replace('/users');
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }
                this.isLoading = false;
            },
            handleError() {
                this.error = null;
            },
        }
    };
</script>