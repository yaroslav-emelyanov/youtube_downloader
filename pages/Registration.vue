<template>
    <div class="container modify">
        <title-iterator :title="title"></title-iterator>
        <div class="hint">Password must be at least {{ $v.user.password.$params.minLength.min }} characters</div>
        <form @submit.prevent="submit">
            <input :class="{error: ($v.user.name.$dirty && !$v.user.name.required)}"
                   v-model="user.name"
                   placeholder="name"
                   autocomplete="off"
                   type="text"
            >
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
            <input :class="{error: ($v.password_confirm.$dirty && !$v.password_confirm.required) || ($v.password_confirm.$dirty && !$v.password_confirm.sameAs)}"
                   v-model="password_confirm"
                   placeholder="confirm password"
                   autocomplete="off"
                   type="password"
            >
            <div class="row">
                <button type="submit" class="btn active">register</button>
                <NuxtLink to="/login" tag="button" class="btn">sign in</NuxtLink>
            </div>
        </form>
    </div>
</template>

<script>
    import { required, email, minLength } from 'vuelidate/lib/validators'
    import TitleIterator from '@/components/TitleIterator'
    import {mapActions, mapMutations} from 'vuex'
    export default {
        name: "Register",
        layout: 'empty',
        data: () => ({
           title: 'Registration',
           user: {
               name: '',
               email: '',
               password: ''
           },
           password_confirm: ''
        }),
        validations: {
            user: {
                name: {required},
                email: {required, email},
                password: {
                    required, minLength : minLength(6)
                }
            },
            password_confirm: {
                required,
                sameAs (value) {
                    return value === this.user.password
                }
            }
        },
        methods: {
            ...mapMutations(['show_loader', 'close_loader',]),
            ...mapActions(['register']),
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
            async submit () {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                this.show_loader()
                const status = await this.register(this.user)
                if (status === 'ok') {
                    this.$router.push('/')
                    this.close_loader()
                } else {
                    this.close_loader()
                }
            }
        },
        mounted () {
            this.animation()
        },
        components: {
            TitleIterator
        }
    }
</script>

