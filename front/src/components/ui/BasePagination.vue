<template>
    <div class="pagination-container">
        <slot></slot>
    </div>
</template>

<style scoped>
    .pagination-container {
        margin: 1rem auto;
        max-width: 40rem;

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

        text-align: center;
    }
</style>
