<template>
    <div @click="close_popup" class="tining">
        <div class="popup">
            <div class="video">
                <iframe :src="`https://www.youtube.com/embed/${popup_id}`" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapGetters } from 'vuex'
    export default {
        name: "Popup",
        computed: {
            ...mapGetters(['popup_id'])
        },
        methods: {
            ...mapMutations(['close_popup', 'set_popup_id'])
        },
    }
</script>

<style lang="scss" scoped>
  .tining {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.2);
      z-index: 100;
  }

  .video {
      width: 100%;
      height: 250px;
      margin: 0;
      box-shadow: none;
      &-information {
          height: 50%;
          padding: 20px;
      }
      &-name {
          font-size: 20px;
          font-weight: bold;
      }
      &-date {
          font-size: 14px;
          text-transform: uppercase;
      }
  }

    .popup  {
        width: 500px;
        color: white;
        background: rgb(22, 53, 65);
    }

    .stats {
        display: flex;
    }

    .views {
        display: flex;
        align-items: center;
    }

    .view {
        width: 16px;
        height: 16px;
        margin-right: 10px;
        background: url('~@/assets/img/icons/eye.png') center center no-repeat;
    }

    .likes {
        display: flex;
        align-items: center;
    }

  .heart {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      background: url('~@/assets/img/icons/heart.png') center center/contain no-repeat;
  }
    .amount {
        font-size: 12px;
        margin-right: 10px;
    }

    .row {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
    }
</style>