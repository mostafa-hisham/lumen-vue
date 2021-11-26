<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCompatibilities(true)">Refresh</base-button>
                    <base-button v-if="isLoggedIn" link :to="compatibilityAddLink">Add New</base-button>
                </div>
                <div class="search-controls" v-if="isLoggedIn">
                    <input class="form-control" type="text"
                           v-model="search" placeholder="Search"
                           @keyup.enter="onSearch" />
                    <base-button mode="outline" @click="onSearch()">search</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCompatibilities">
                    <compatibility-item
                            v-for="compatibility in filteredCompatibilities"
                            :key="compatibility.id"
                            :id="compatibility.id"
                            :third_party_name="compatibility.third_party_name"
                            :condition="compatibility.condition"></compatibility-item>
                </ul>
                <h3 v-else>No Compatibilities found.</h3>
            </base-card>
        </section>
        <section>
            <base-pagination>
                <v-pagination
                        v-model="page"
                        :pages="paginationLinks.total"
                        :range-size="1"
                        active-color="#DCEDFF"
                        @update:modelValue="onPageChange"
                />
            </base-pagination>
        </section>
    </div>
</template>

<script>
    import CompatibilityItem from '../../components/compatibilities/CompatibilityItem.vue';
    import VPagination from "@hennge/vue3-pagination";
    import "@hennge/vue3-pagination/dist/vue3-pagination.css";

    export default {
        components: {
            CompatibilityItem,
            VPagination
        },
        data() {
            return {
                isLoading: false,
                error: null,
                page: 1,
                search: '',
                activeFilters: {
                    frontend: true,
                    backend: true,
                    career: true,
                },
            };
        },
        computed: {
            filteredCompatibilities() {
                const compatibilities = this.$store.getters['compatibilities/compatibilities'];
                return compatibilities.data;
            },
            paginationLinks() {
                const compatibilities = this.$store.getters['compatibilities/compatibilities'];
                return {links: compatibilities.links, total: parseInt(compatibilities.last_page)};
            },
            hasCompatibilities() {
                return !this.isLoading && this.$store.getters['compatibilities/hasCompatibilities'];
            },
            isLoggedIn() {
                return this.$store.getters['auth/getLoggedUser'];
            },
            compatibilityAddLink() {
                return this.$route.path + '/add';
            },
        },
        created() {
            this.search = this.$route.query.search ? this.$route.query.search : '';
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1;

            this.loadCompatibilities();
        },
        methods: {
            async loadCompatibilities(refresh = false) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('compatibilities/loadCompatibilities', {
                        forceRefresh: refresh,
                        search: this.search,
                        page: this.page
                    });
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }
                this.isLoading = false;
            },
            handleError() {
                this.error = null;
            },
            async onPageChange(clicked_page) {
                this.page = clicked_page;
                this.$router.push({path: this.$route.path, query: {search: this.search, page: this.page}});
                this.loadCompatibilities(true);
            },
            async onSearch() {
                this.page = 1;
                this.$router.push({path: this.$route.path, query: {search: this.search, page: this.page}});
                this.loadCompatibilities(true);
            },
        },
    };
</script>

<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .controls {
        display: flex;
        justify-content: space-between;
    }
    .search-controls{
        margin: 1em auto;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;

        -webkit-box-pack: center;
        -moz-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;

    }
    .search-controls input {
        padding: 0.75rem 1.5rem;
        padding-left: 10px;
        border-radius: 30px;
        border: 1px solid #3a0061;
        margin-right: 10px;
    }
</style>