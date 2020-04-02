module.exports = {
    head: {
        title: 'youtube_downloader',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:400,900&display=swap'}
        ]
    },
    loading: {color: 'transparent'},
    build: {
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    modules: [
        '@nuxtjs/axios'
    ],

    axios: {
      baseURL: (process.env.BASE_URL || 'http://localhost:3000') + '/server'
    },

    plugins: [
        {src: '~plugins/animation', ssr: false},
        {src: '~plugins/vuelidate', ssr: true},
        {src: '~plugins/cookie', ssr: true},
    ]
}

