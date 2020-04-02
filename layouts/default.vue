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
            ]
        }),
        computed: {
            ...mapGetters(['loading'])
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
        align-items: center;
        max-width: 768px;
        margin: 2.5vh auto 0;
        color: #408fb4;
        padding: 5vh 0;
        &-link {
            font-family: 'Raleway', sans-serif;
            text-transform: uppercase;
            padding: 0 1em;
            cursor: pointer;
            text-decoration: none;
            line-height: 50px;
            &:visited {
                color: #408fb4;
            }
            &.active {
                color: white;
                background-color: rgba(72, 208, 245, 0.1);
                box-shadow: 0 0 5px 1px rgba(72, 208, 245, 0.5);
                transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border-radius: 5px;
            }
            &:hover {
                color: white;
            }
        }
    }

</style>

