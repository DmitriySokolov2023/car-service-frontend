// src/api/parts/partsService.js
import { api } from '../client' // твой axios-инстанс

export const getAllParts = () =>
	api
		.get('/parts/get')
		.then(res => res.data) // { items: [...] }
		.catch(err => {
			console.error('Ошибка загрузки запчастей!', err)
			throw err
		})

export const createPart = ({ part_number, name, unit, price, stock_qty }) =>
	api
		.post('/parts/create', { part_number, name, unit, price, stock_qty })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка создания запчасти!', err)
			throw err
		})

export const updatePart = (id, { part_number, name, unit, price, stock_qty }) =>
	api
		.put(`/parts/update/${id}`, { part_number, name, unit, price, stock_qty })
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка обновления запчасти!', err)
			throw err
		})

export const deletePart = id =>
	api
		.delete(`/parts/delete/${id}`)
		.then(res => res.data) // { deleted: true, id }
		.catch(err => {
			console.error('Ошибка удаления запчасти!', err)
			throw err
		})
