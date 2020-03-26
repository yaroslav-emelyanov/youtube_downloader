<template>
    <div class="container">
        <title-iterator :title="title"></title-iterator>
        <div class="hint">Password must be at least {{ $v.user.password.$params.minLength.min }} characters</div>
        <form @submit.prevent="submit">
            <input :class="{error: ($v.user.email.$dirty && !$v.user.email.required) || ($v.user.email.$dirty && !$v.user.email.email)}"
                   v-model="user.email"
                   placeholder="email"
                   autocomplete="off"
                   type="text"
            >
            <input :class="{error: ($v.user.password.$dirty && !$v.user.password.required) || ($v.user.password.$dirty && !$v.user.password.minLength)}"
                   v-model="user.password"
                   placeholder="password"
                   autocomplete="off"
                   type="password"
            >
            <div class="row">
                <button class="btn active">sign in</button>
                <NuxtLink to="/registration" tag="button" class="btn">register</NuxtLink>
            </div>
        </form>
    </div>
</template>

<script>
    import { required, email, minLength } from 'vuelidate/lib/validators'
    import { mapMutations, mapActions } from 'vuex'

    import TitleIterator from '@/components/TitleIterator'
    import bcrypt from 'bcryptjs'
    export default {
        name: "Login",
        layout: 'empty',
        data: () => ({
           title: 'Login',
           user: {
               email: '',
               password: ''
           }
        }),
        validations: {
            user: {
                email: {required, email},
                password: {
                    required, minLength : minLength(6)
                }
            }
        },
        methods: {
          ...mapMutations(['show_loader', 'close_loader', 'setResponse']),
          ...mapActions(['login']),
          animation () {
              this.$anime({
                  targets: 'input',
                  width: [0, '100%'],
                  delay: this.$anime.stagger(100)
              })
              this.$anime({
                  targets: '.container',
                  duration: 1000,
                  background: ['linear-gradient(rgba(72, 208, 245, 0.4), transparent 0)', 'linear-gradient(rgba(72, 208, 245, 0.4), transparent 100%)'],
              })
              this.$anime({
                  targets: '.btn',
                  delay: this.$anime.stagger(100, {start: 500}),
                  opacity: [0, 1]
              })
          },
          async submit() {
              if (this.$v.$invalid) {
                  this.$v.$touch()
                  return
              }

              this.show_loader()
              const status = await this.login(this.user)
              if (status === 'ok') {
                  this.$router.push('/')
                  this.close_loader()
              }
              else this.close_loader()
          },
            create_hint () {
                const message = this.$route.query.message
                if (message && message === 'logout') {
                    this.setResponse({status: 'ok', message: 'you are logged out'})
                }
            }
        },
        mounted () {
           this.animation()
            this.create_hint()
        },
        components: {
            TitleIterator
        }
    }
</script>

<style lang="scss" scoped>

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
           &:focus {
               outline: none;
           }
           &::placeholder {
               color: black;
           }
       }
   }
</style>