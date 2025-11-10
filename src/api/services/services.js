import { api } from '../client'

export const getAllServices = () =>
	api
		.get('/services/get')
		.then(res => res.data) // { items: [...] }
		.catch(err => {
			console.error('Ошибка загрузки услуг!', err)
			throw err
		})

export const createService = ({ name, unit, base_price, description }) =>
	api
		.post('/services/create', { name, unit, base_price, description })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка создания услуги!', err)
			throw err
		})

export const updateService = (id, { name, unit, base_price, description }) =>
	api
		.put(`/services/update/${id}`, { name, unit, base_price, description })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка обновления услуги!', err)
			throw err
		})

export const deleteService = id =>
	api
		.delete(`/services/delete/${id}`)
		.then(res => res.data) // { deleted: true, id }
		.catch(err => {
			console.error('Ошибка удаления услуги!', err)
			throw err
		})
