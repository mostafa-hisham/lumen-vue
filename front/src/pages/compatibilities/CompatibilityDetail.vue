<template>
    <div>
        <section>
            <base-card>
                <h2>{{ third_party_name }}</h2>
                <h3>{{ condition }}</h3>
                <p class="d-label">ids:</p>
                <p>{{ ids }}</p>
                <p class="d-label">classes:</p>
                <p>{{ classes }}</p>
                <p class="d-label">tags:</p>
                <p>{{ tags }}</p>
                <p class="d-label">files:</p>
                <p>{{ files }}</p>
                <p class="d-label">attributes:</p>
                <p>{{ attributes }}</p>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <base-button link :to="editLink">Edit</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        /*data() {
            return {
                selectedCompatibility: null,
            };
        },*/
        computed: {
            selectedCompatibility() {
                return this.$store.getters['compatibilities/getSelectedCompatibility'];
            },
            third_party_name() {
                return this.selectedCompatibility.third_party_name;
            },
            condition() {
                return this.selectedCompatibility.condition;
            },
            ids() {
                return this.selectedCompatibility.ids;
            },
            classes() {
                return this.selectedCompatibility.classes;
            },
            tags() {
                return this.selectedCompatibility.tags;
            },
            files() {
                return this.selectedCompatibility.files;
            },
            attributes() {
                return this.selectedCompatibility.attributes;
            },
            /*            editLink() {
                            return this.$route.path + '/' + this.id + '/edit';
                        },*/
        },
        methods: {
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