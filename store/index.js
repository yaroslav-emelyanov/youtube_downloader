export const state = () => ({
    popup_visible: false,
    loading: false,
    video_id: '',
    current_choice_download: 'video',
    response: {status: '', message: ''},
    persent_loading: 0,
    choices: ['video', 'audio only', 'video only'],
    popup_id: ''
})


export const actions = {
    async register ({commit}, user) {
        try {
            const res = await this.$axios.$post('/registration', user)
            commit('setResponse', res)
            return res.status
        } catch (e) {
            console.log('Error: ', e)
        }
    },
    async login ({commit}, user) {
        try {
            const res = await this.$axios.$post('/login', user)
            commit('setResponse', res)
            return res.status
        } catch (e) {
            console.log('Error: ', e)
        }
    },
    async download ({getters}, video_id) {
        const { baseURL } = this.$axios.defaults
        const type = getters.current_choice_download
        return await fetch(baseURL + '/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({video_id, type})
        });
    },
    delete ({commit}, record_id) {
        this.$axios.$delete('/deleteRecord', {data: {record_id}})
    },
    async set_avatar_url ({commit}, src) {
        const query = `?url=${src}`
        const response = await this.$axios.$get('/setAvatarUrl' + query)
        commit('setResponse', response)
    }
}

export const mutations = {
    setResponse (state, {status, message}) {
        state.response.status = status
        state.response.message = message
    },
    show_popup(state) {
        state.popup_visible = true
    },
    close_popup(state) {
        state.popup_visible = false
    },
    show_loader(state) {
        state.loading = true
    },
    close_loader(state) {
        state.loading = false
    },
    set_choice_download(state, value) {
        state.current_choice_download = value
    },
    set_popup_id (state, id) {
        state.popup_id = id
    }
}

export const getters = {
    popup_visible: s => s.popup_visible,
    loading: s => s.loading,
    message: s => s.response.message,
    status: s => s.response.status,
    current_choice_download: s => s.current_choice_download,
    persent_loading: s => s.persent_loading,
    choices: s => s.choices,
    popup_id: s => s.popup_id,
    host: s => s.host
}