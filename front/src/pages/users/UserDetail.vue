<template>
    <div>
        <section>
            <base-card>
                <h2>{{ name }}</h2>
                <h3>{{ email }}</h3>
            </base-card>
        </section>
        <!--<section>
            <base-card>
                <header>
                    <base-button link :to="editLink">Edit</base-button>
                </header>
                <router-view></router-view>
            </base-card>
        </section>-->
    </div>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                selectedUser: null,
            };
        },
        computed: {
            name() {
                return this.selectedUser.name;
            },
            email() {
                return this.selectedUser.email;
            },
/*            editLink() {
                return this.$route.path + '/' + this.id + '/edit';
            },*/
        },
        created() {
            this.selectedUser = this.$store.getters['users/users'].find(
                (user) => user.id.toString() === this.id.toString()
            );
        },
    };
</script>