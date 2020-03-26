import {get_user_from_cookie} from '../helpers'
export default async function ({ req, redirect }) {
        if (process.server) {
        const user = await get_user_from_cookie(req)
        if (!user) {
            redirect('/login')
        }
    }
}
