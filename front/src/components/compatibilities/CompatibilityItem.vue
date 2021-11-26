<template>
    <li>
        <h3>{{ third_party_name }}</h3>
        <h4>{{ condition }}</h4>
        <div class="actions">
            <base-button v-if="isLoggedIn" link :to="compatibilityEditLink">Edit</base-button>
            <base-button mode="flat-red" v-if="isLoggedIn" @click.prevent="deleteCompatibility(id)">Delete</base-button>
        </div>
    </li>
</template>

<script>
    export default {
        props: ['id', 'third_party_name', 'condition'],
        computed: {
            isLoggedIn() {
                return this.$store.getters['auth/getLoggedUser'];
            },
            compatibilityEditLink() {
                return this.$route.path + '/' + this.id;
            },
        },
        methods:{
            async deleteCompatibility(id){
                console.log(`DELETE ME PLEASE ${id}`);
                try {
                    await this.$store.dispatch('compatibilities/deleteCompatibility', id);
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }
            }
        }
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