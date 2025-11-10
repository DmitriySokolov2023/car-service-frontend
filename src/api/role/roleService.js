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
export const getAllRoles = () =>
	api
		.get('/role/get')
		.then(res => res.data) // { items: [...] }
		.catch(err => {
			console.error('Ошибка загрузки ролей!', err)
			throw err
		})
export const createRole = ({ name, description }) =>
	api
		.post('/role/create', { name, description })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка создания роли!', err)
			throw err
		})

export const updateRole = (id, { name, description }) =>
	api
		.put(`/role/update/${id}`, { name, description })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка обновления роли!', err)
			throw err
		})

export const deleteRole = id =>
	api
		.delete(`/role/delete/${id}`)
		.then(res => res.data) // { deleted: true, id }
		.catch(err => {
			console.error('Ошибка удаления роли!', err)
			throw err
		})
