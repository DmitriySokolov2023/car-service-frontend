import { api } from '../client'

export const getAllRoleCustom = () => {
	return api
		.get('role/get/custom')
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка получения ролей!', err)
			throw err
		})
}
