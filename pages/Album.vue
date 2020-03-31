<template>
    <div>
        <Popup v-if="popup_visible"/>
        <p class="description" v-if="!videos.length">You have not uploaded any videos yet.</p>
        <div class="album" v-else>
            <Card v-for="(v, idx) of videos"
                  @removeRecord="removeRecord"
                  class="card"
                  :video="v"
                  :key="idx"
            />
        </div>
    </div>
</template>

<script>
    import Card from '@/components/Card.vue'
    import Popup from '@/components/Popup.vue'

    import {mapGetters} from 'vuex'
    export default {
        middleware: 'auth',
        name: "Album",
        asyncData({$axios}) {
            return $axios.$get('http://localhost:3000/server/getUserAlbum')
                .then(videos => ({videos}))
        },
        computed: {
            ...mapGetters(['popup_visible'])
        },
        methods: {
            removeRecord (id) {
               this.videos = this.videos.filter(v => v.id !== id)
            }
        },
        mounted() {
           this.$anime({
               targets: '.card',
               opacity: [0, 1],
               translateY: [100 + 'px', 0],
               delay: this.$anime.stagger(100)
           })
        },
        components: {
            Card, Popup
        }
    }
</script>

<style lang="scss" scoped>

    .album {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        max-width: 1300px;
        margin: 5vh auto 0;
    }

    .description {
        color: white;
        text-align: center;
        grid-column-start: 1;
        grid-column-end: 4;
    }
</style>
