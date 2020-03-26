<template>
    <div class="container mt-25">
        <div class="title">Paste link on video:</div>
        <div class="wrapper">
            <div class="container-loading">
                <div class="process-line" :style="{width: percent + '%'}"></div>
            </div>
            <input v-model="url" ref="input" type="text" class="input" :style="style" :disabled="disabled">
            <transition @enter="enterInput" @leave="leaveInput">
                <button @click="create_download_process" v-if="flag" class="download" :disabled="disabled">
                    <svg viewBox="0 0 512.171 512.171">
                        <path d="M479.046,283.925c-1.664-3.989-5.547-6.592-9.856-6.592H352.305V10.667C352.305,4.779,347.526,0,341.638,0H170.971c-5.888,0-10.667,4.779-10.667,10.667v266.667H42.971c-4.309,0-8.192,2.603-9.856,6.571c-1.643,3.989-0.747,8.576,2.304,11.627l212.8,213.504c2.005,2.005,4.715,3.136,7.552,3.136s5.547-1.131,7.552-3.115l213.419-213.504C479.793,292.501,480.71,287.915,479.046,283.925z"/>
                    </svg>
                </button>
            </transition>
        </div>
        <OutputVideo :url="url" @flagChange="flagChange" @set_video_id="set_video_id" v-show="flag"/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import OutputVideo from '@/components/OutputVideo'
    export default {
        middleware: 'auth',
        data: () => ({
            url: '',
            flag: false,
            style: {},
            video_id: '',
            disabled: false,
            percent: 0
        }),
        methods: {
            ...mapActions(['download']),
            async create_download_process () {
                this.disabled = true
                const response = await this.download(this.video_id)

                const file_name = response.headers.get('Content-Disposition').split('=')[1].replace(/\"/g, '')
                const reader = response.body.getReader();
                const contentLength = +response.headers.get('Content-Length');

                let chunks = [];
                while(true) {
                    const {done, value} = await reader.read();

                    if (done) {
                        break;
                    }

                    chunks.push(value);

                    this.percent += value.length*100/contentLength
                }

                setTimeout(() => {this.percent = 0}, 1000)

                let blob = new Blob(chunks);
                const urlBlob = URL.createObjectURL(blob);
                const a = document.createElement('a')
                a.href = urlBlob
                a.download = file_name
                a.click()
                URL.revokeObjectURL(urlBlob);
                a.remove()

                this.disabled = false
            },
            flagChange (value) {
                this.flag = value
            },
            set_video_id(id) {
                this.video_id = id
            },
            enterInput (el, done) {
                this.style = {left: 0, transform: 'translateX(0)'}
                this.$anime({targets: el, width: [0, 60], complete: done})
            },
            leaveInput (el, done) {
                this.$anime({targets: el, width: 0, easing: 'easeInOutQuart', duration: 400, complete: done})
            },
            animateInput() {
              const target = this.$refs.input
              this.$anime.timeline({targets: target, duration: 750})
                  .add({width: [0, '100%'], duration: 1000})
                  .add({height: [0, 40]})
                  .finished.then(target.focus())
              this.$anime({
                  targets: '.title',
                  translateY: [25, 0],
                  opacity: [0, 1],
                  delay: 1000
                })
          }
        },
        async mounted() {
            this.animateInput()
        },
        components: {
            OutputVideo
        }
    }
</script>

<style lang="scss">
    .container-loading {
        position: absolute;
        left: 0;
        top: 0;
        width: 91%;
        height: 100%;
        border-radius: 4px;
        overflow: hidden;
    }

    .process-line {
        height: 100%;
        width: 0;
        border-radius: inherit;
        background: #2a637d;
    }

    .container {
        max-width: 700px;
        padding: 0 3em;
        margin: 0 auto;
    }

    .footer-wrapper {
        display: flex;
        padding-top: 5vh;
    }

    .mt-25 {
        margin-top: 25vh;
    }

    .flex {
        display: flex;
        align-items: center;
    }

    .title {
        color: white;
        margin: 0 0 1vh;
        text-transform: uppercase;
        font-size: 12px;
    }

    .input {
        position: relative;
        left: 50%;
        transform: translate(-50%);
        border-radius: 4px;
        border: 1px solid #bddfef;
        box-sizing: border-box;
        color: white;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        background-color: transparent;
        width: 100%;
        box-shadow: 0 0 5px 1px rgba(72, 208, 245, 0.5), inset 0 0 5px 1px rgba(72, 208, 245, 0.5);
        &:focus {
            outline: none;
        }
    }

    .el-button {
        display: inline-block;
        cursor: pointer;
        border: none;
        color: white;
        text-align: center;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        background: #408fb4;
        text-transform: uppercase;
        &:focus {
            outline: none;
        }
        &:active {
            background: #396d91;
        }
    }
    .video {
        width: 350px;
        height: 197px;
        margin-right: 60px;
        box-shadow: 0 0 5px 1px rgba(72, 208, 245, 0.5), inset 0 0 5px 1px rgba(255, 255, 255, 0.5);
        iframe {
            width: 100%;
            height: 100%;
        }
    }

    .wrapper {
        position: relative;
        display: flex;

    }

    .download {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 40px;
        font-weight: bold;
        align-self: flex-start;
        border-radius: 5px;
        cursor: pointer;
        border: none;
        background-color: rgba(72, 208, 245, 0.6);
        box-shadow: 0 0 5px 1px rgba(72, 208, 245, 0.5), inset 0 0 5px 1px rgba(255, 255, 255, 0.5);
        transition: background 0.15s ease-in-out;
        &:hover {
            background-color: rgba(72, 208, 245, 0.8);
        }
        &:disabled {
            cursor: default;
            background-color: rgba(72, 208, 245, 0.2);
        }
        svg {
               width: 20px;
               height: 20px;
               path {
                   fill: white;
               }
           }
    }
</style>

