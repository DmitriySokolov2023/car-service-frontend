import ServicesList from './ServicesList'
import styles from './ServicesPage.module.scss'
const ServicesPage = () => {
	return (
		<div className={styles.employees}>
			<div className='list__items'>
				<ServicesList />
			</div>
		</div>
	)
}
export default ServicesPage
