import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { getCarsByClient } from '../../api/cars/cars'
import OrdersForm from './OrdersForm'
import styles from './OrdersPage.module.scss'

const OrdersList = ({ id_car, id_client }) => {
	const [dataList, setDataList] = useState([])
	const location = useLocation()

	const fio = location.state?.fio || null
	const fetchData = async () => {
		const { items } = await getCarsByClient(id_client)
		if (items) setDataList(items)
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className='add__title line' style={{ marginBottom: '10px' }}>
				<div>Добавить заказ-наряд</div>
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
			<div className='add__items'>
				<OrdersForm fetchData={fetchData} id_client={id_client} />
			</div>
			<div className='add__title' style={{ marginTop: '20px' }}>
				Список заказ-нарядов
			</div>
			<div className={styles.list}>
				{/* {dataList &&
					dataList.map((el, index) => (
						<OrdersListForm
							element={el}
							key={el.id}
							index={index}
							fetchData={fetchData}
							id_client={id_client}
						/>
					))} */}
			</div>
		</>
	)
}
export default OrdersList
