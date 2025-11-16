import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { getCarById } from '../../api/cars/cars'
import { getClientById } from '../../api/clients/clients'
import { getEmployeesCustom } from '../../api/employees/employees'
import { getOrdersBy } from '../../api/orders/orderService'
import OrdersForm from './OrdersForm'
import OrdersListForm from './OrdersListForm'
import styles from './OrdersPage.module.scss'

const OrdersList = ({ id_car, id_client }) => {
	const [dataList, setDataList] = useState([])
	const [dataCar, setDataCar] = useState([])
	const [dataClient, setDataClient] = useState([])
	const [manager, setManager] = useState([])
	const location = useLocation()

	const fio = location.state?.fio || null
	const fetchData = async () => {
		const { items } = await getOrdersBy({
			client_id: id_client,
			car_id: id_car,
		})
		if (items) setDataList(items)

		const car = await getCarById(id_car)
		const client = await getClientById(id_client)

		if (car && client) {
			setDataCar(car && car['item'])
			setDataClient(client && client['item'])
		}

		const mn = await getEmployeesCustom()

		if (mn) {
			setManager(mn)
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className='add__title line' style={{ marginBottom: '10px' }}>
				<div>Добавить заказ-наряд на автомобиль клиента</div>

				<NavLink
					to={`/clients/cars/${id_client}`}
					className='router-link active-link'
					state={{
						fio: fio,
					}}
				>
					{'Вернуться к списку авто ->'}
				</NavLink>
			</div>
			<div className={styles.info}>
				<div>
					Клиент: {dataClient.name} | id: {dataClient.id}
				</div>
				<div>
					Авто: {dataCar.make} {dataCar.model} | {dataCar.vin} | {dataCar.year}{' '}
					г.
				</div>
			</div>

			<div className='add__items'>
				<OrdersForm
					fetchData={fetchData}
					id_client={id_client}
					id_car={id_car}
					manager={manager}
				/>
			</div>
			<div className='add__title' style={{ marginTop: '20px' }}>
				Список заказ-нарядов по автомобилю клиента
			</div>
			<div className={styles.list}>
				{dataList &&
					dataList.map((el, index) => (
						<OrdersListForm
							manager={manager}
							element={el}
							key={el.id}
							index={index}
							fetchData={fetchData}
							id_client={id_client}
							id_car={id_car}
						/>
					))}
			</div>
		</>
	)
}
export default OrdersList
