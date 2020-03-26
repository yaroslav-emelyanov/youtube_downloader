<template>
    <div class="container">
        <div class="profile">
            <label for="file" class="photo" ref="photo" :style="{backgroundColor: !img_vidsible ? 'white' : ''}"
            >
                <div class="wrapper-avatar">
                    <img v-if="img_vidsible" ref="avatar" :src="url" alt="avatar">
                </div>
                <div class="info">
                    <div class="user_name">{{ user.name }}</div>
                    <div class="amount_download">downloads: <span>{{ user.downloads }}</span></div>
                </div>
            </label>
            <input accept="image/jpeg,image/png"
                   @change="fileLoaded"
                   ref="input"
                   type="file"
                   id="file"
            >
        </div>
        <div class="update">
            <component :is="currentInput" v-model="user.name"
                       @back="back"
                       @save="save"
            ></component>
        </div>
        <div @click="logout" class="logout">Logout</div>
    </div>
</template>

<script>
    import InputImg from '@/components/InputImg'
    import InputName from '@/components/InputName'

    import { mapMutations, mapActions } from 'vuex'
    export default {
        middleware: 'auth',
        name: "Profile",
        asyncData ({$axios, redirect}) {
            return $axios.$get('http://localhost:3000/server/getUserName')
                .then(({status, user}) => status === 'ok'
                    ? {user} : redirect('/login'))
        },
        data: () => ({
            currentInput: 'input-name',
            img_vidsible: false,
            url: ''
        }),
        methods: {
            ...mapActions(['set_avatar_url']),
            ...mapMutations(['setResponse']),
          animation () {
              this.$anime.timeline({targets: '.photo', duration: 2000})
                  .add({translateX: [300 + '%', 0]})
              this.$anime({targets: '.update', opacity: [0, 1], duration: 2000})
              this.$anime({
                  targets: '.info',
                  translateY: 0,
                  translateX: -50 + '%',
                  opacity: [0, 1],
                  duration: 1000,
                  delay: 500
              })
              this.$anime.timeline({targets: '.container', duration: 2000})
                  .add({background: ['linear-gradient(to left, rgba(72, 208, 245, 0.1), transparent 0)', 'linear-gradient(to left, rgba(72, 208, 245, 0.1), transparent 85%)']})

          },
            logout () {
                this.$cookies.remove('auth')
                this.$router.push('/login?message=logout')
            },
            fileLoaded(e) {
                const file = e.target.files[0]
                const size = (file.size/1024).toFixed(2)
                if (size > 50) {
                   this.setResponse({
                       status: 'error',
                       message: `File must not exceed 50 KB. Your file size: ${size}kb`
                   })
                    return
                }

                const reader = new FileReader()
                reader.onload = e => {
                    this.url = e.target.result
                    this.img_vidsible = true

                    this.currentInput = 'input-img'
                }
                reader.readAsDataURL(file)
            },
            back () {
                this.currentInput = 'input-name'
                if (this.user.avatar) {
                    this.url = `/img/${this.user.avatar}`
                    this.img_vidsible = true
                } else {
                    this.url = ``
                    this.img_vidsible = false
                }
                this.$refs.input.value = ''
            },
            async save () {
                const img = this.$refs.input.files[0]
                const data = new FormData();
                data.append('image', img)

                const response = await fetch('http://localhost:3000/server/setAvatar', {
                     method: 'POST',
                     body: data
                 })
                const json =  await response.json()
                this.setResponse(json)
                this.currentInput = 'input-name'
                this.$refs.input.value = ''
            }
        },
        mounted() {
            this.animation()
            if (this.user.avatar) {
                this.url = `/img/${this.user.avatar}`
                this.img_vidsible = true
            }
        },
        components: {
            InputName, InputImg
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 768px;
        margin-top: 20vh;
        background: linear-gradient(to left, rgba(72, 208, 245, 0.1), transparent);
        color: white;
    }

    .wrapper-avatar {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .profile {
        display: flex;
        justify-content: center;
        font-size: 14px;
    }

    .info {
        position: absolute;
        left: 50%;
        bottom: -50px;
        transform: translateX(-50%);
        white-space: nowrap;
        text-align: center;
    }

    .logout {
        position: absolute;
        right: 20px;
        top: -25px;
        cursor: pointer;
        &::after {
            content: '>';
            position: absolute;
            right: -10px;
            top: 0;
            transition: all 0.2s;
        }
        &:hover {
            &::after {
                right: -20px;
            }
        }
    }

    .photo {
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        cursor: pointer;
        background: url('~@/assets/img/user.png') center center no-repeat;
        &.no-hover {
            &:hover {
                cursor: default;
                animation: none;
                &::before{
                    display: none;
                }
                &::after{
                    display: none;
                }
            }
        }
        &::before {
            content: 'new Image';
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 20px;
            font-weight: bold;
            white-space: nowrap;
            text-transform: uppercase;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.5s;
            z-index: 3;
        }
        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0);
            background-color: rgba(72, 208, 245, 0);
            transition: all 0.5s;
            z-index: 1;
        }
        &:hover {
            animation: pulse 2s;
            &::after {
                box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.4);
                background-color: rgba(72, 208, 245, 0.5);
            }
            &::before {
                opacity: 1;
            }
        }
    }

    .user_name {
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .update {
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    @-webkit-keyframes pulse {
        0% {
            -webkit-box-shadow: 0 0 0 0 rgba(72, 208, 245, 0.5);
        }
        70% {
            -webkit-box-shadow: 0 0 0 100px rgba(72, 208, 245, 0);
        }
        100% {
            -webkit-box-shadow: 0 0 0 0 rgba(72, 208, 245, 0);
        }
    }

    #file {
        display: none;
    }

</style>