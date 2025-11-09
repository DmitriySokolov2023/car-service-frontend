import axios from 'axios'

export const api = axios.create({
	baseURL: '/api', // твой backend Flask
	headers: {
		'Content-Type': 'application/json',
	},
})
