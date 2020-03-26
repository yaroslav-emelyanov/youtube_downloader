<template>
    <div class="empty">
       <Tooltip/>
       <div v-if="loading" class="loader-wrapper">
           <Loader color="#1E3C55" :step="20"/>
       </div>
       <Nuxt/>
    </div>
</template>

<script>
    import Loader from '@/components/Loader'
    import Tooltip from '@/components/Tooltip'
    import {mapGetters} from 'vuex'
    export default {
        name: "empty",
        computed: {
            ...mapGetters(['loading'])
        },
        components: {
            Loader, Tooltip
        }
    }
</script>


<style lang="scss">
    .loader-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    .empty {

        .container {
            position: relative;
            max-width: 400px;
            margin: 25vh auto 0;
            padding: 40px;
            background: linear-gradient(rgba(72, 208, 245, 0.4), transparent);
            &.modify {
                margin-top: 20vh;
            }
        }

        .btn {
            font-size: 12px;
            margin-top: 10px;
            margin-right: 20px;
            line-height: 16px;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: transparent;
            &:focus {
                outline: none;
            }
            &:last-child {
                margin-right: 0;
            }
        }

        .row {
            display: flex;
            justify-content: center;
        }

        form {
            display: flex;
            flex-direction: column;
            input {
                position: relative;
                left: 50%;
                transform: translateX(-50%);
                margin: 1vh 0;
                border-radius: 10px;
                line-height: 40px;
                padding: 0 20px;
                box-shadow: 0 0 10px 1px rgba(72, 208, 245, 0.71);
                border: none;
                color: black;
                &.error {
                    box-shadow: 0 0 10px 1px rgba(245, 8, 10, 0.71);
                }
                &:focus {
                    outline: none;
                }
                &::placeholder {
                    color: black;
                }
            }
        }

        .btn.active {
            background: white;
            padding: 0 20px;
            color: black;
            line-height: 24px;
            box-shadow: 0 0 10px 1px rgba(72, 208, 245, 0.71);
            transition: padding 0.2s ease-in-out;
        }

        .hint {
            font-size: 10px;
            color: white;
            text-align: right;
        }
    }
</style>

