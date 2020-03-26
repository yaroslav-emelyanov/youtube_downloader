<template>
    <div class="row">
            <button @click="$emit('back')" class="btn back">Back</button>
            <button @click="$emit('save')" class="btn">Save image</button>
    </div>
</template>

<script>
    export default {
        name: "InputImg",
        data: () => ({
            url: ''
        })
    }
</script>

<style lang="scss" scoped>
    .name {
        display: block;
        margin: 0 auto 20px;
        border-radius: 10px;
        line-height: 40px;
        padding: 0 20px;
        box-shadow: 0 0 10px 1px rgba(72, 208, 245, 0.71);
        border: none;
        color: white;
        text-align: center;
        background-color: transparent;
    &:focus {
         outline: none;
     }
    }
    .btn {
        display: block;
        padding: 0 20px;
        line-height: 1.5em;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    &:focus {
         outline: none;
     }
    }

    .row {
        display: flex;
        justify-content: center;
    }

    .btn {
        &.back {
            margin-right: 10px;
        }
    }
</style>