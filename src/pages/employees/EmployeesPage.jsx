import { useEffect, useState } from 'react'
import { getAllRoleCustom } from '../../api/role/roleService'
import EmployeesForm from './EmployeesForm'
import EmployeesList from './EmployeesList'
import styles from './EmployeesPage.module.scss'
const EmployeesPage = () => {
	const [role, setRole] = useState([])
	const fetchData = async () => {
		setRole(await getAllRoleCustom())
	}
	useEffect(() => {
		fetchData()
	}, [])

	console.log(role)
	return (
		<div className={styles.employees}>
			{role && (
				<>
					<div className='add__items'>
						<div className='add__title'>Добавить сотрудника</div>
						<EmployeesForm role={role} />
					</div>
					<div className='list__items'>
						<div className='add__title'>Список сотрудников</div>
						<EmployeesList role={role} />
					</div>
				</>
			)}
		</div>
	)
}
export default EmployeesPage
