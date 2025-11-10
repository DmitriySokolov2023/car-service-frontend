import { useEffect, useState } from 'react'
import { getAllRoleCustom } from '../../api/role/roleService'
import EmployeesList from './EmployeesList'
import styles from './EmployeesPage.module.scss'
const EmployeesPage = () => {
	const [role, setRoles] = useState([])

	const fetchData = async () => {
		const data = await getAllRoleCustom()
		setRoles(Array.isArray(data) ? data : [])
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className={styles.employees}>
			{role && (
				<div className='list__items'>
					<EmployeesList role={role} />
				</div>
			)}
		</div>
	)
}
export default EmployeesPage
