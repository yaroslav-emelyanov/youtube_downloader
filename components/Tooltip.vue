<template>
        <transition name="fade" @enter="enter">
            <div v-if="isVisible" class="tooltip">
                <div class="status">{{ status === 'ok' ? 'success' : 'error' }}</div>
                <div class="message">{{ message }}</div>
            </div>
        </transition>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Tooltip",
        data: () => ({
           isVisible: false
        }),
        methods: {
            enter() {
                setTimeout(() => {this.isVisible = false}, 7000)
            }
        },
        computed: {
            ...mapGetters(['message', 'status'])
        },
        watch: {
            message () {
              this.isVisible = true
            }
        }
    }
</script>

<style lang="scss" scoped>
   .tooltip {
       position: absolute;
       left: 50%;
       top: 7vh;
       display: flex;
       align-items: center;
       font-size: 14px;
       color: white;
       padding: 0 20px;
       line-height: 40px;
       border-radius: 5px;
       background: #245365;
       transform: translateX(-50%);
       &.modify {
           top: 18vh;
       }
   }
    .status {
        font-weight: bold;
        border-radius: 10px;
        padding: 0 10px;
        line-height: 24px;
        color: black;
        background: white;
        margin-right: 10px;
        text-transform: uppercase;
    }
    .message {
        font-size: 14px;
    }

   .fade-enter-active, .fade-leave-active {
       transition: all .25s ease-in-out;
   }

   .fade-enter, .fade-leave-to {
       transform: translate(-50%, -50px);
       opacity: 0;
   }
</style>