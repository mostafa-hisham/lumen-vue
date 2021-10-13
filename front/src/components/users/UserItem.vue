<template>
    <li>
        <h3>{{ name }}</h3>
        <h4>{{ email }}</h4>
        <div class="actions">
            <base-button v-if="isLoggedIn" link :to="userDetailsLink">Details</base-button>
        </div>
    </li>
</template>

<script>
    export default {
        props: ['id', 'name', 'email'],
        computed: {
            isLoggedIn() {
                return this.$store.getters['auth/getLoggedUser'];
            },
            /*userEditLink() {
                return this.$route.path + '/' + this.id + '/edit'; // /users/1/edit
            },*/
            userDetailsLink() {
                return this.$route.path + '/' + this.id; // /users/1
            },
        },
    };
</script>

<style scoped>
    li {
        margin: 1rem 0;
        border: 1px solid #424242;
        border-radius: 12px;
        padding: 1rem;
    }

    h3 {
        font-size: 1.5rem;
    }

    h3,
    h4 {
        margin: 0.5rem 0;
    }

    div {
        margin: 0.5rem 0;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
    }
</style>