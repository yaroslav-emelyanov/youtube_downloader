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
            const res = await fetch('http://localhost:3000/server/registration', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
            const json = await res.json()
            commit('setResponse', json)
            return json.status
        } catch (e) {
            console.log('Error: ', e)
        }
    },
    async login ({commit}, user) {
        try {
            const res = await fetch('http://localhost:3000/server/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
            const json = await res.json()
            commit('setResponse', json)
            return json.status
        } catch (e) {
            console.log('Error: ', e)
        }
    },
    async download ({commit, getters}, video_id) {
        const url = 'http://localhost:3000/server/download'
        const type = getters.current_choice_download
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({video_id, type})
        });
        return response
    },
    async delete ({commit}, record_id) {
        const url = 'http://localhost:3000/server/deleteRecord'
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({record_id})
        })
    },
    async get_detail_info ({commit, getters}) {
        const id = getters.popup_id
        const url = 'http://localhost:3000/server/getDetailInfo'
        const query = `?id=${id}`
        return await this.$axios.$get(url + query)
    },
    async set_avatar_url (ctx, src) {
        const url = 'http://localhost:3000/server/setAvatarUrl'
        const query = `?url=${src}`
        const response = await this.$axios.$get(url + query)
        console.log(response);
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
}