import { api } from '../client'

export const getAllOrder = () => {
	return api
		.get(`/order`)
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка при получении заказов!', err)
			throw err
		})
}
export const getOrderById = id_order => {
	return api
		.get(`/order/${id_order}`)
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка при при получении заказа!', err)
			throw err
		})
}
export const deleteOrderById = id_order => {
	return api
		.delete(`/order/${id_order}`)
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка при удалении заказа!', err)
			throw err
		})
}
export const saveOrder = data => {
	return api
		.post(`/order/save`, data)
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка при сохранении сохранении заказа!', err)
			throw err
		})
}
