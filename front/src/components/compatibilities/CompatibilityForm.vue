<template>
    <form @submit.prevent="submitForm">
        <div class="form-control" :class="{invalid: !third_party_name.isValid}">
            <label for="third_party_name">Third Party Name</label>
            <input
                    type="text"
                    id="third_party_name"
                    v-model.trim="third_party_name.val"
                    @blur="clearValidity(['third_party_name'])"
            />
            <p v-if="!third_party_name.isValid">Third Party Name must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !condition.isValid}">
            <label for="condition">Condition</label>
            <input
                    type="condition"
                    id="condition"
                    v-model.trim="condition.val"
                    @blur="clearValidity(['condition'])"
            />
            <p v-if="!condition.isValid">Condition must not be empty.</p>
        </div>
        <div class="form-control" :class="{invalid: !ids.isValid}">
            <label for="ids">Ids</label>
            <textarea id="ids" name="ids" v-model.trim="ids.val"
                      @blur="clearValidity(['ids','classes','tags','files','attributes'])"></textarea>
            <p v-if="!ids.isValid">Please add data in at least one of ids,classes,tags,files,attributes.</p>
        </div>
        <div class="form-control" :class="{invalid: !classes.isValid}">
            <label for="classes">Classes</label>
            <textarea id="classes" name="classes" v-model.trim="classes.val"
                      @blur="clearValidity(['ids','classes','tags','files','attributes'])"></textarea>
            <p v-if="!classes.isValid">Please add data in at least one of ids,classes,tags,files,attributes.</p>
        </div>
        <div class="form-control" :class="{invalid: !tags.isValid}">
            <label for="tags">Tags</label>
            <textarea id="tags" name="tags" v-model.trim="tags.val"
                      @blur="clearValidity(['ids','classes','tags','files','attributes'])"></textarea>
            <p v-if="!tags.isValid">Please add data in at least one of ids,classes,tags,files,attributes.</p>
        </div>
        <div class="form-control" :class="{invalid: !files.isValid}">
            <label for="files">Files</label>
            <textarea id="files" name="ids" v-model.trim="files.val"
                      @blur="clearValidity(['ids','classes','tags','files','attributes'])"></textarea>
            <p v-if="!files.isValid">Please add data in at least one of ids,classes,tags,files,attributes.</p>
        </div>
        <div class="form-control" :class="{invalid: !attributes.isValid}">
            <label for="attributes">Attributes</label>
            <textarea id="attributes" name="attributes" v-model.trim="attributes.val"
                      @blur="clearValidity(['ids','classes','tags','files','attributes'])"></textarea>
            <p v-if="!ids.isValid">Please add data in at least one of ids,classes,tags,files,attributes.</p>
        </div>
        <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
        <base-button>Save</base-button>
    </form>
</template>

<script>

    export default {
        emits: ['save-data'],
        props: ['selectedCompatibility'],
        data() {
            return {
                third_party_name: {
                    val: (this.selectedCompatibility && this.selectedCompatibility.third_party_name) ? this.selectedCompatibility.third_party_name : '',
                    isValid: true,
                },
                condition: {
                    val: (this.selectedCompatibility && this.selectedCompatibility.condition) ? this.selectedCompatibility.condition : '',
                    isValid: true,
                },
                ids: {
                    val: (this.selectedCompatibility && this.selectedCompatibility.ids) ? this.selectedCompatibility.ids : '',
                    isValid: true,
                },
                classes: {
                    val: (this.selectedCompatibility && this.selectedCompatibility.classes) ? this.selectedCompatibility.classes : '',
                    isValid: true,
                },
                tags: {
                    val: (this.selectedCompatibility && this.selectedCompatibility.tags) ? this.selectedCompatibility.tags : '',
                    isValid: true,
                },
                files: {
                    val: (this.selectedCompatibility && this.selectedCompatibility.files) ? this.selectedCompatibility.files : '',
                    isValid: true,
                },
                attributes: {
                    val: (this.selectedCompatibility && this.selectedCompatibility.attributes) ? this.selectedCompatibility.attributes : '',
                    isValid: true,
                },
                formIsValid: true,
            };
        },
        methods: {
            clearValidity(inputs) {
                let that=this;
                inputs.forEach(input => that[input].isValid = true);
            },
            validateForm() {
                this.formIsValid = true;
                if (this.third_party_name.val === '') {
                    this.third_party_name.isValid = false;
                    this.formIsValid = false;
                }
                if (this.condition.val === '') {
                    this.condition.isValid = false;
                    this.formIsValid = false;
                }
                if (this.ids.val === '' && this.classes.val === ''
                    && this.tags.val === '' && this.files.val === '' && this.attributes.val === '') {
                    this.ids.isValid = false;
                    this.classes.isValid = false;
                    this.tags.isValid = false;
                    this.files.isValid = false;
                    this.attributes.isValid = false;
                    this.formIsValid = false;
                }
            },
            submitForm() {
                this.validateForm();

                if (!this.formIsValid) {
                    return;
                }
                let formData = new FormData();
                formData.append('third_party_name', this.third_party_name.val);
                formData.append('condition', this.condition.val);
                formData.append('ids', this.ids.val);
                formData.append('classes', this.classes.val);
                formData.append('tags', this.tags.val);
                formData.append('files', this.files.val);
                formData.append('attributes', this.attributes.val);

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