import { useEffect, useState } from 'react'
import { getAllEmployees } from '../../api/employees/employees'
import EmployeesListForm from './EmployeesListForm'
import styles from './EmployeesPage.module.scss'

const EmployeesList = ({ role }) => {
	const [dataList, setDataList] = useState([])

	const fetchData = async () => {
		const { items } = await getAllEmployees()
		if (items) setDataList(items)
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className={styles.list}>
			<div className={styles.list__header}>
				<div>id</div>
				<div>Роль</div>
				<div>ФИО</div>
				<div>Телефон</div>
				<div>Email</div>
				<div>Статус</div>
				<div></div>
				<div></div>
			</div>
			{dataList &&
				dataList.map(el => (
					<EmployeesListForm element={el} role={role} key={el.id} />
				))}
		</div>
	)
}
export default EmployeesList
