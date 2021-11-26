<template>
    <section>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <h2>Add New</h2>
            <compatibility-form @save-data="saveData"></compatibility-form>
        </base-card>
    </section>
</template>

<script>
    import CompatibilityForm from '../../components/compatibilities/CompatibilityForm';

    export default {
        data() {
            return {
                isLoading: false,
                error: null,
            };
        },
        components: {
            CompatibilityForm,
        },
        methods: {
            async saveData(data) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('compatibilities/addNewCompatibility', data);
                    this.$router.replace('/rucss-safelist');
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