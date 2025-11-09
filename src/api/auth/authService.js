import { api } from '../client'

export const auth = (login, password) => {
	return api
		.post('/auth/login', { login, password }) // тело запроса, без params
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка авторизации!', err)
			throw err
		})
}
