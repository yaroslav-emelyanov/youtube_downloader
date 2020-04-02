<template>
    <div>
        <input class="name" :value="value" @input="$emit('input', $event.target.value)" maxlength="25" type="text" placeholder="User name">
        <button @click="updateName" class="btn">Update</button>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "InputName",
        props: ['value'],
        methods: {
            ...mapMutations(['setResponse']),
            async updateName() {
                if (!this.value) return
                const res = await this.$axios.$put('/updateUserName', {name: this.value})
                this.setResponse(res)
            }
        }
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
        margin: 0 auto;
        padding: 0 20px;
        line-height: 1.5em;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    &:focus {
         outline: none;
     }
    }
</style>