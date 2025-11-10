import RolesList from './RolesList'
import styles from './RolesPage.module.scss'
const RolesPage = () => {
	return (
		<div className={styles.employees}>
			<div className='list__items'>
				<RolesList />
			</div>
		</div>
	)
}
export default RolesPage
