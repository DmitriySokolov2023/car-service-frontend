import { api } from '../client'

export const getAllEmployees = () => {
	return api
		.get('employees/get')
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка получения сотрудников!', err)
			throw err
		})
}
export const getEmployeesCustom = () =>
	api
		.get('/employees/get/custom')
		.then(res => res.data) // вернётся массив [{ value, label }]
		.catch(err => {
			console.error('Ошибка загрузки сотрудников (custom)!', err)
			throw err
		})
export const getEmployeesCustomById = id =>
	api
		.get(`/employees/get/custom/${id}`)
		.then(res => res.data) // { value, label }
		.catch(err => {
			console.error('Ошибка загрузки сотрудника (custom by id)!', err)
			throw err
		})
export const createEmployee = payload => {
	return api
		.post('/employees/create', payload)
		.then(res => res.data)
		.catch(err => {
			console.error('Ошибка создания сотрудника!', err)
			throw err
		})
}

export const updateEmployee = async (id, payload) => {
	const { data } = await api.put(`/employees/update/${id}`, payload)
	return data
}

export const deleteEmployee = async id => {
	const { data } = await api.delete(`/employees/delete/${id}`)
	return data
}
