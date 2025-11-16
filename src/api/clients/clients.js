// src/api/clients/clientsService.js
import { api } from '../client' // твой настроенный axios instance

export const getAllClients = () =>
	api
		.get('/clients/get')
		.then(res => res.data) // { items: [...] }
		.catch(err => {
			console.error('Ошибка загрузки клиентов!', err)
			throw err
		})
export const getClientById = id =>
	api
		.get(`/clients/get/${id}`)
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка получения клиента по id!', err)
			throw err
		})
export const createClient = ({ is_company, name, phone, email, comment }) =>
	api
		.post('/clients/create', { is_company, name, phone, email, comment })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка создания клиента!', err)
			throw err
		})

export const updateClient = (id, { is_company, name, phone, email, comment }) =>
	api
		.put(`/clients/update/${id}`, { is_company, name, phone, email, comment })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка обновления клиента!', err)
			throw err
		})

export const deleteClient = id =>
	api
		.delete(`/clients/delete/${id}`)
		.then(res => res.data) // { deleted: true, id }
		.catch(err => {
			console.error('Ошибка удаления клиента!', err)
			throw err
		})
