<template>
    <section>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <base-card>
            <h2>Add New</h2>
            <compatibility-form @save-data="saveData" :selectedCompatibility="selectedCompatibility"></compatibility-form>
        </base-card>
    </section>
</template>

<script>
    import CompatibilityForm from '../../components/compatibilities/CompatibilityForm';

    export default {
        props: ['id'],
        data() {
            return {
                isLoading: false,
                error: null,
            };
        },
        computed: {
            selectedCompatibility() {
                return this.$store.getters['compatibilities/getSelectedCompatibility'];
            },
        },
        components: {
            CompatibilityForm,
        },
        methods: {
            async saveData(data) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('compatibilities/editCompatibility', {"id": this.id, 'formData': data});
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

            async setCompatibility() {
                try {
                    await this.$store.dispatch('compatibilities/selectCompatibility', this.id);
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }
            },
        },
        created() {
            this.setCompatibility();
        },
    };
</script>