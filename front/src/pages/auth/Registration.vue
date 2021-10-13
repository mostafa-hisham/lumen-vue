<template>
    <section>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <h2>Register</h2>
            <register-form @save-data="saveData"></register-form>
            <br/>
            <base-button mode="outline" link to="/login">Login</base-button>
        </base-card>
    </section>
</template>

<script>
    import RegisterForm from '../../components/auth/RegisterForm.vue';

    export default {
        data() {
            return {
                isLoading: false,
                error: null,
            };
        },
        components: {
            RegisterForm,
        },
        methods: {
            async saveData(data) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('auth/register', data);
                    this.$router.replace('/login');
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }
                this.isLoading = false;
                /*setTimeout(() => this.$router.replace('/login'), 3000)*/
            },
            handleError() {
                this.error = null;
            },
        }
    };
</script>