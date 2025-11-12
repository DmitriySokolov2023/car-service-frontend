// routes.data.js
import CarsPage from '../pages/cars/CarsPage'
import ClientsPage from '../pages/clients/ClientsPage'
import EmployeesPage from '../pages/employees/EmployeesPage'
import HomePage from '../pages/home/HomePage'
import LoginPage from '../pages/login/Login'
import OrderPage from '../pages/order/OrderPage'
import PartsPage from '../pages/parts/PartsPage'
import RolesPage from '../pages/roles/RolesPage'
import ServicesPage from '../pages/service/ServicesPage'
// можешь потом сделать отдельную страницу клиентов

export const routes = [
	{ path: '/login', component: LoginPage, auth: false },
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
				path: 'employees',
				component: EmployeesPage,
				auth: true,
				requireAdmin: true,
				name: 'Сотрудники',
				block: 'Справочники',
			},
			{
				index: true,
				path: 'roles',
				component: RolesPage,
				auth: true,
				requireAdmin: true,
				name: 'Роли',
				block: 'Справочники',
			},

			{
				index: true,
				path: 'services',
				component: ServicesPage,
				auth: true,
				requireAdmin: true,
				name: 'Услуги',
				block: 'Справочники',
			},
			{
				index: true,
				path: 'parts',
				component: PartsPage,
				auth: true,
				requireAdmin: true,
				name: 'Запчасти',
				block: 'Справочники',
			},

			{
				index: true,
				path: 'clients',
				component: ClientsPage,
				auth: true,
				requireAdmin: true,
				name: 'Клиенты и автомобили',
				block: 'Клиенты',
			},
			{
				index: true,
				path: 'clients/cars/:id_client',
				component: CarsPage,
				auth: true,
				requireAdmin: true,
			},
			{
				index: true,
				path: 'order',
				component: OrderPage,
				auth: true,
				requireAdmin: true,
				name: 'Создать заказ-наряд',
				block: 'Заказы',
			},
		],
	},
]
