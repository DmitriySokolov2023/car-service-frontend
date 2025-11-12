import CarsList from './CarsList'
import styles from './CarsPage.module.scss'
const CarsPage = () => {
	return (
		<div className={styles.employees}>
			<div className='list__items'>
				<CarsList />
			</div>
		</div>
	)
}
export default CarsPage
