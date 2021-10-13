<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section v-if="!isLoggedIn">
            <user-filter @change-filter="setFilters"></user-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadUsers(true)">Refresh</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasUsers">
                    <user-item
                            v-for="user in filteredUsers"
                            :key="user.id"
                            :id="user.id"
                            :name="user.name"
                            :email="user.email"></user-item>
                </ul>
                <h3 v-else>No Users found.(run the seeder)</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
    import UserItem from '../../components/users/UserItem.vue';
    import UserFilter from '../../components/users/UserFilter.vue';

    export default {
        components: {
            UserItem,
            UserFilter,
        },
        data() {
            return {
                isLoading: false,
                error: null,
                activeFilters: {
                    frontend: true,
                    backend: true,
                    career: true,
                },
            };
        },
        computed: {
            filteredUsers() {
                const users = this.$store.getters['users/users'];
                return users;
                /*return coaches.filter((coach) => {
                  if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                  }
                  if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                  }
                  if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                  }
                  return false;
                });*/
            },
            hasUsers() {
                return !this.isLoading && this.$store.getters['users/hasUsers'];
            },
            isLoggedIn() {
                return this.$store.getters['auth/getLoggedUser'];
            },
        },
        created() {
            this.loadUsers();
        },
        methods: {
            /*setFilters(updatedFilters) {
                this.activeFilters = updatedFilters;
            }*/
            setFilters() {
            },
            async loadUsers(refresh = false) {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('users/loadUsers', {
                        forceRefresh: refresh,
                    });
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }
                this.isLoading = false;
            },
            handleError() {
                this.error = null;
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
</style>