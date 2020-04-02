<template>
    <div @mouseleave="tooltip = false" @mouseenter="tooltip = true" class="card">
        <transition name="fade">
            <div v-if="tooltip" class="list">
                <div v-for="(choice, idx) of choices"
                     :class="{active: current_choice_download === choice}"
                     @click="set_choice_download(choice)"
                     class="list-item"
                     :key="idx"
                >{{ choice }}</div>
            </div>
        </transition>
        <div class="img" :style="{background: `url('https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg') center center/cover no-repeat`}"></div>
        <div class="wrapper-loading">
            <div class="process-line" :style="{width: percent + '%'}"></div>
        </div>
        <div class="content">
            <div class="card-title" :title="video.name">{{ video.name }}</div>
            <div class="card-footer">
                <div class="file-size">{{ video.size }}mb</div>
                <div class="actions">
                    <button @click="create_download" class="btn download" :disabled="disabled"></button>
                    <button @click="show_popup_with_video" class="btn info"></button>
                    <button @click="remove_record" class="btn delete"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex'
    export default {
        name: "Card",
        props: ['video'],
        data: () => ({
            tooltip: false,
            percent: 0,
            disabled: false
        }),
        computed: {
            ...mapGetters(['choices', 'current_choice_download'])
        },
        methods: {
            ...mapActions(['download', 'delete']),
            ...mapMutations(['set_choice_download', 'set_popup_id', 'show_popup']),
            async create_download() {
                this.disabled = true
                const response = await this.download(this.video.youtube_id)

                const file_name = response.headers.get('Content-Disposition').split('=')[1].replace(/\"/g, '')
                const reader = response.body.getReader();
                const contentLength = +response.headers.get('Content-Length');

                let chunks = [];
                while(true) {
                    const {done, value} = await reader.read();

                    if (done) {
                        break;
                    }

                    chunks.push(value)
                    this.percent += value.length*100/contentLength
                }

                setTimeout(() => {
                    this.percent = 0
                    this.disabled = false
                }, 1000)

                let blob = new Blob(chunks);
                const urlBlob = URL.createObjectURL(blob);
                const a = document.createElement('a')
                a.href = urlBlob
                a.download = file_name
                a.click()
                URL.revokeObjectURL(urlBlob);
                a.remove()
            },
            async remove_record () {
                this.$emit('removeRecord', this.video.id)
                this.delete(this.video.id)
            },
            show_popup_with_video () {
                this.set_popup_id(this.video.youtube_id)
                this.show_popup()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper-loading {
        height: 2px;
        .process-line {
            width: 0;
            height: 100%;
            background: #41caef;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease-in-out;
    }

    .fade-enter, .fade-leave-to {
        transform: translateX(130px);
        opacity: 0;
    }

    .card {
        border-radius: 4px;
        color: white;
        text-transform: uppercase;
        background-color: rgba(72, 208, 245, 0.1);
        padding-bottom: 1rem;
        overflow: hidden;
        &:hover {
            box-shadow: 0 0 20px 1px rgba(72, 208, 245, 0.5);
        }
        .img {
            height: 200px;
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            background: url('~@/assets/img/mock.jpg') center center/cover no-repeat;
            @media screen and (max-width: 420px){
                height: 45vw;
            }
        }
        .content {
            padding: 0 1.5rem;
        }
        .card-title {
            align-items: center;
            font-size: 16px;
            font-weight: bold;
            word-break: break-all;
            padding: 1rem 0 0.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: default;
        }
        &-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .actions {
                position: relative;
                display: flex;
                .btn {
                    position: relative;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    margin-left: 14px;
                    cursor: pointer;
                    border: 5px solid white;
                    box-shadow: none;
                    z-index: 5;
                    &:focus {
                        outline: none;
                    }
                    &:hover {
                      box-shadow: 0 0 8px 2px rgba(72, 208, 245, 0.5);
                    }
                    &.download {
                        background: url('~@/assets/img/icons/down-arrow.png') center center/contain no-repeat white;
                        &:disabled {
                            opacity: 0.5;
                            cursor: default;
                        }
                    }
                    &.delete {
                        background: url('~@/assets/img/icons/delete.png') center center/contain no-repeat white;
                    }
                    &.info {
                        background: url('~@/assets/img/icons/info.png') center center/contain no-repeat white;
                    }
                }
            }
            .file-size {
                font-size: 0.875rem;
                font-weight: 400;
                line-height: 1.375rem;
                letter-spacing: 0.1em;
                font-family: Arial;
            }
        }
    }

    .list {
        position: absolute;
        width: 140px;
        right: -30px;
        top: 25px;
        font-size: 12px;
        padding: 10px 10px 10px 20px;
        color: black;
        font-weight: bold;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.31);
        &-item {
            position: relative;
            cursor: pointer;
            opacity: 0.7;
            &:before {
                position: absolute;
                left: -12px;
                top: -2px;
                content: '>';
                opacity: 0;
            }
            &:hover {
              opacity: 1;
            }
            &.active {
                opacity: 1;
                &:before {
                    position: absolute;
                    left: -12px;
                    top: -2px;
                    content: '>';
                    opacity: 1;
                }
            }
        }
    }
</style>