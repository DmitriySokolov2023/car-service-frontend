import { useLocation } from 'react-router'
import OrdersList from './OrdersList'
import styles from './OrdersPage.module.scss'
const OrdersPage = () => {
	const location = useLocation()

	const id_client = location.state.id_client || ''
	const id_car = location.state.id_car || ''

	return (
		<div className={styles.employees}>
			<div className='list__items'>
				<OrdersList id_car={id_car} id_client={id_client} />
			</div>
		</div>
	)
}
export default OrdersPage
