<template>
    <div class="title">
        <div v-for="(letter, idx) of title.split('')" class="letter" :key="idx">{{ letter }}</div>
    </div>
</template>

<script>
    export default {
        name: "TitleIterator",
        props: ['title'],
        mounted() {
            this.$anime({
            targets: '.letter',
            opacity: [0, 1],
            translateY: [-100 +'px', 0],
            delay: this.$anime.stagger(100)
        })
        }
    }
</script>

<style scoped>
    .title {
        display: flex;
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 2vh;
        color: white;
        text-shadow: 0 2px 10px black;
    }
</style>