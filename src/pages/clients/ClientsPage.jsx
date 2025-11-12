import ClientsList from './ClientsList'
import styles from './ClientsPage.module.scss'
const ClientsPage = () => {
	return (
		<div className={styles.employees}>
			<div className='list__items'>
				<ClientsList />
			</div>
		</div>
	)
}
export default ClientsPage
