// routes.data.js
import ClientsPage from '../pages/clients/ClientsPage'
import HomePage from '../pages/home/HomePage'
import OrderPage from '../pages/order/OrderPage'
// можешь потом сделать отдельную страницу клиентов

export const routes = [
	{
		path: '/',
		component: HomePage,
		auth: true,
		requireAdmin: true,

		name: null,
		block: null,
		type: null,

		children: [
			{
				index: true,
				path: '',
				component: OrderPage,
				auth: true,
				requireAdmin: true,

				name: null,
				block: null,
			},
			{
				index: true,
				path: 'order',
				component: OrderPage,
				auth: true,
				requireAdmin: true,
				name: 'Заказы',
				block: 'Меню',
			},
			{
				index: true,
				path: 'clients',
				component: ClientsPage,
				auth: true,
				requireAdmin: true,
				name: 'Клиенты',
				block: 'Меню',
			},
		],
	},
]
