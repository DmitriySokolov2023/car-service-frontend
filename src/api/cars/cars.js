// src/api/cars/carsService.js
import { api } from '../client' // твой axios-инстанс

export const getAllCars = () =>
	api
		.get('/cars/get')
		.then(res => res.data) // { items: [...] }
		.catch(err => {
			console.error('Ошибка загрузки авто!', err)
			throw err
		})
export const getCarsByClient = clientId =>
	api
		.get(`/cars/get/by-client/${clientId}`)
		.then(res => res.data) // { items: [...], count: N }
		.catch(err => {
			console.error('Ошибка загрузки авто клиента!', err)
			throw err
		})
export const createCar = ({
	client_id,
	make,
	model,
	vin,
	license_plate,
	year,
	mileage,
}) =>
	api
		.post('/cars/create', {
			client_id,
			make,
			model,
			vin,
			license_plate,
			year,
			mileage,
		})
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка создания авто!', err)
			throw err
		})

export const updateCar = (
	id,
	{ client_id, make, model, vin, license_plate, year, mileage }
) =>
	api
		.put(`/cars/update/${id}`, {
			client_id,
			make,
			model,
			vin,
			license_plate,
			year,
			mileage,
		})
		.then(res => res.data) // { item: {...} }
		.catch(err => {
			console.error('Ошибка обновления авто!', err)
			throw err
		})

export const deleteCar = id =>
	api
		.delete(`/cars/delete/${id}`)
		.then(res => res.data) // { deleted: true, id }
		.catch(err => {
			console.error('Ошибка удаления авто!', err)
			throw err
		})
