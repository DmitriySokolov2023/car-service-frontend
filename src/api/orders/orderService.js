// src/api/orders/ordersService.js
import { api } from '../client' // твой axios-инстанс

export const getAllOrders = () =>
	api
		.get('/orders/get')
		.then(res => res.data) // { items: [...] }
		.catch(err => {
			console.error('Ошибка загрузки заказов!', err)
			throw err
		})

export const createOrder = ({
	client_id,
	car_id,
	manager_id,
	status,
	comment,
}) =>
	api
		.post('/orders/create', { client_id, car_id, manager_id, status, comment })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка создания заказа!', err)
			throw err
		})

export const updateOrder = (
	id,
	{ client_id, car_id, manager_id, status, comment }
) =>
	api
		.put(`/orders/update/${id}`, {
			client_id,
			car_id,
			manager_id,
			status,
			comment,
		})
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка обновления заказа!', err)
			throw err
		})

export const deleteOrder = id =>
	api
		.delete(`/orders/delete/${id}`)
		.then(res => res.data) // { deleted: true, id }
		.catch(err => {
			console.error('Ошибка удаления заказа!', err)
			throw err
		})
export const getOrdersBy = ({ client_id, car_id } = {}) =>
	api
		.get('/orders/get/by', { params: { client_id, car_id } })
		.then(res => res.data) // { items, count }
		.catch(err => {
			console.error('Ошибка фильтрации заказов!', err)
			throw err
		})
