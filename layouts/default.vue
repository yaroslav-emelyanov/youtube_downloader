<template>
    <div class="default">
        <Tooltip class="modify"/>
        <div v-if="loading" class="loader-wrapper">
            <Loader color="#1E3C55" :step="20"/>
        </div>
        <div class="nav">
            <nuxt-link class="nav-link" v-for="(l, idx) of linksConfig"
                       :to="l.path" :key="idx"
                       active-class="active"
                       :exact="l.exact"
            >{{ l.title }}</nuxt-link>
            <div class="box-link" :style="style_box_link"></div>
        </div>
        <nuxt/>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import Tooltip from '@/components/Tooltip'
    import Loader from '@/components/Loader'
    export default {
        data: () => ({
            linksConfig: [
                {title: 'main', path: '/', exact: true},
                {title: 'album', path: '/album'},
                {title: 'profile', path: '/profile'},
            ],
            links: [],
            active_link: 0,
        }),
        computed: {
            ...mapGetters(['loading']),
            style_box_link () {
                return this.links[this.active_link]
            }
        },
        methods: {
            get_links_positions () {
               const links = document.querySelectorAll('.nav-link')
               links.forEach((l, idx) => {
                   this.links.push({
                       path_name : this.linksConfig[idx].title,
                       top: l.offsetTop + 'px',
                       left: l.offsetLeft + 'px',
                       width: l.offsetWidth + 'px',
                   })
               })
            },
            set_active_link (path) {
               const id = this.links.findIndex(l => l.path_name === path)
               this.active_link = id
          }
        },
        mounted () {
            this.get_links_positions()
            let route_name = this.$route.name.toLowerCase()
            route_name = route_name === 'index' ? 'main' : route_name
            this.set_active_link(route_name)
            this.$anime({
                targets: '.box-link',
                duration: 2000,
                opacity: [0, 1]
            })
        },
        watch:{
            $route (to, from) {
                let next_route_name = to.name.toLowerCase()
                next_route_name = next_route_name === 'index' ? 'main' : next_route_name
                this.set_active_link(next_route_name)
            }
        },
        components: {
            Tooltip, Loader
        }
    }
</script>

<style lang="scss">
    * {
        font-family: Raleway, sans-serif;
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        background-color: #100e15;
    }


    .default {
        padding-bottom: 10vh;
    }

    ::-webkit-scrollbar {
        width: 12px;
        background-color: rgba(72, 208, 245, 0.1);
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 8px 1px rgba(72, 208, 245, 0.5);
        background-color: rgba(0, 0, 0, 0.25);
    }

    .nav {
        position: relative;
        display: flex;
        justify-content: center;
        max-width: 768px;
        margin: 0 auto;
        color: #408fb4;
        padding: 5vh 0;
        &-link {
            font-family: 'Raleway', sans-serif;
            text-transform: uppercase;
            padding: 0 1em;
            cursor: pointer;
            text-decoration: none;
            &:visited {
                color: #408fb4;
            }
            &.active {
                color: white;
            }
            &:hover {
                color: white;
            }
        }

        .box-link {
            position: absolute;
            height: 50px;
            width: 200px;
            background-color: rgba(72, 208, 245, 0.1);
            box-shadow: 0 0 5px 1px rgba(72, 208, 245, 0.5);
            transform: translateY(-30%);
            transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border-radius: 5px;
        }
    }

</style>

