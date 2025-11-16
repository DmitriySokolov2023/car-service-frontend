import { useLocation, useParams } from 'react-router'
import OrdersDetailsForm from './OrdersDetailsForm'
import styles from './OrdersDetailsPage.module.scss'
const OrdersDetailsPage = () => {
	const location = useLocation()
	const { order_id } = useParams()

	const element = location.state.element || ''
	const id_car = location.state.id_car || ''
	const id_client = location.state.id_client || ''

	const number_order = new Date(element.opened_at)
		.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		.split('.')
		.join('-')

	return (
		<div className={styles.employees}>
			<div className='list__items'>
				<div className={styles.order__title}>
					Закрытие заказ наряда № {id_client}
					{id_car}
					{order_id}
					{number_order}
				</div>
				<div className='add__items'>
					<OrdersDetailsForm />
				</div>
			</div>
		</div>
	)
}
export default OrdersDetailsPage
