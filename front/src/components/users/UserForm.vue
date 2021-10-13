<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !firstName.isValid}">
            <label for="name">Name</label>
            <input
                    type="text"
                    id="name"
                    v-model.trim="name.val"
                    @blur="clearValidity('name')"
            />
            <p v-if="!name.isValid">Name must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !email.isValid}">
            <label for="email">Email</label>
            <input
                    type="email"
                    id="email"
                    v-model.trim="email.val"
                    @blur="clearValidity('email')"
            />
            <p v-if="!email.isValid">Email Is not Valid.</p>
        </div>
        <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
        <base-button>Register</base-button>
    </form>
</template>

<script>

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    export default {
        emits: ['save-data'],
        data() {
            return {
                name: {
                    val: '',
                    isValid: true,
                },
                email: {
                    val: '',
                    isValid: true,
                },
                formIsValid: true,
            };
        },
        methods: {
            clearValidity(input) {
                this[input].isValid = true;
            },
            validateForm() {
                this.formIsValid = true;
                if (this.name.val === '') {
                    this.name.isValid = false;
                    this.formIsValid = false;
                }
                if (this.email.val === '' && this.email.val.value.match(regexEmail)) {
                    this.email.isValid = false;
                    this.formIsValid = false;
                }
            },
            submitForm() {
                this.validateForm();

                if (!this.formIsValid) {
                    return;
                }

                const formData = {
                    name: this.name.val,
                    email: this.email.val,
                };

                this.$emit('save-data', formData);
            },
        },
    };
</script>

<style scoped>
    .form-control {
        margin: 0.5rem 0;
    }

    label {
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
    }

    input[type='checkbox'] + label {
        font-weight: normal;
        display: inline;
        margin: 0 0 0 0.5rem;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        border: 1px solid #ccc;
        font: inherit;
    }

    input:focus,
    textarea:focus {
        background-color: #f0e6fd;
        outline: none;
        border-color: #3d008d;
    }

    input[type='checkbox'] {
        display: inline;
        width: auto;
        border: none;
    }

    input[type='checkbox']:focus {
        outline: #3d008d solid 1px;
    }

    h3 {
        margin: 0.5rem 0;
        font-size: 1rem;
    }

    .invalid label {
        color: red;
    }

    .invalid input,
    .invalid textarea {
        border: 1px solid red;
    }
</style>