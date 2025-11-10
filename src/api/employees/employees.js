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
