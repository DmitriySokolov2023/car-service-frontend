import PartsList from './PartsList'
import styles from './PartsPage.module.scss'
const PartsPage = () => {
	return (
		<div className={styles.employees}>
			<div className='list__items'>
				<PartsList />
			</div>
		</div>
	)
}
export default PartsPage
