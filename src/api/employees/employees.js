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
