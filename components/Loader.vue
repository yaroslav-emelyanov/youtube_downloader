<template>
    <div class="loader">
        <div v-for="(color, idx) of amount"
             class="circle"
             :style="style(idx)"
             :key="idx"
        ></div>
    </div>
</template>

<script>
    import Color from 'color'
    export default {
        name: "Loader",
        props: {
          radius: {
              type: Number,
              default: 20
          },
          color: {
                type: String,
                default: '#f5588d'
          },
          amount: {
              type: Number,
              default: 5
          },
          step: {
              type: Number,
              default: 10
          }
        },
        methods: {
            style(idx) {
               const color = this.setColor(idx)
               return {
                   backgroundColor: color,
                   animationDelay: ((idx + 1) * 0.2) + 's',
                   width: this.radius + 'px', height: this.radius + 'px'
               }
            },
            setColor(idx) {
              const color = Color(this.color).hsl().color
              const value3 = parseFloat(color[2].toFixed(0)) + (idx * this.step)
              return `hsl(${color[0].toFixed(0)}, ${color[1].toFixed(0)}%, ${value3}%)`
          }
        }
    }
</script>

<style lang="scss" scoped>
    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        animation-delay: 1s;
        z-index: 100;
    }

    .circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation-name: scale;
        box-shadow: 0 0 5px 1px rgba(72, 208, 245, 0.71);
        &:before {
            content: '';
            width: inherit;
            height: inherit;
            border-radius: 50%;
            background-color: inherit;
            opacity: 0.7;
            animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
            animation-delay: inherit;
            transition: 0.5s all ease;
            transform: scale(1);
        }
    }

    @keyframes scale {
        0% {
            transform: scale(1);
        }
        50%, 75% {
            transform: scale(2.5);
        }
        78%, 100% {
            opacity: 0;
        }
    }

</style>