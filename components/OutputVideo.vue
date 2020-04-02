<template>
    <transition @enter="enterVideo" @leave="leaveVideo">
        <div class="footer-wrapper">
            <div class="video">
                <iframe :src="urlParser(url)" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="choice-download">
                <div v-for="(choice, idx) of choices"
                     class="choice-item"
                     :class="{active: current_choice_download === choice}"
                     @click="set_choice_download(choice)"
                     :key="idx"
                >{{ choice }}</div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        name: "ChoiceTooltip",
        props: ['url'],
        data: () => ({
            choices: ['video', 'audio only', 'video only'],
        }),
        methods: {
            ...mapMutations(['set_choice_download', 'set_video_id']),
            urlParser(url) {
                if (url) {
                    const reg = /\?v=(.{11})/
                    const id = this.url.match(reg);
                    if (id) {
                        this.$emit('set_video_id', id[1])
                        return `https://www.youtube.com/embed/${id[1]}`
                    }
                }
                return ''
            },
            enterVideo (el, done) {
                this.$anime({targets: el, translateY: [-100, 0], opacity: [0, 1], complete: done})
            },
            leaveVideo (el, done) {
                this.$anime({targets: el, translateY: [0, -100], opacity: [1, 0], complete: done})
            }
        },
        computed: {
            ...mapGetters(['current_choice_download'])
        },
        watch: {
            url(value) {
                const reg = /^https?:\/\/www.youtube.com\/watch\?v=.{11}/
                const boolean_value = reg.test(value)
                this.$emit('flagChange', boolean_value)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .footer-wrapper {
        display: flex;
        padding-top: 30px;
    }

    .choice-download {
        align-items: flex-start;
        color: #ffffff;
        .choice-item {
            position: relative;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 5px;
            &:first-letter {
                text-transform: uppercase;
            }
            &:hover {
                 color: #48D0F5;
             }
            &.active{
                &:before {
                     content: '>';
                     position: absolute;
                     left: -18px;
                     top: 0;
                     color: white;
                 }
            }
        }
    }

    @media screen and (max-width: 768px){
        .footer-wrapper {
            flex-direction: column-reverse;
        }

        .video {
            width: 100%;
            height: 320px;
            margin-right: 0;
        }

        .choice-download {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            .choice-item {
                margin-left: 20px;
            }
        }
    }

    @media screen and (max-width: 420px){

        .video {
            height: 200px;
        }

    }

</style>