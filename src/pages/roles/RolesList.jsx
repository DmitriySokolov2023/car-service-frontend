import { useEffect, useState } from 'react'
import { getAllRoles } from '../../api/role/roleService'
import RolesFrom from './RolesFrom'
import RolesListFrom from './RolesListFrom'
import styles from './RolesPage.module.scss'

const RolesList = () => {
	const [dataList, setDataList] = useState([])

	const fetchData = async () => {
		const { items } = await getAllRoles()
		if (items) setDataList(items)
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className='add__title' style={{ marginBottom: '10px' }}>
				Добавить роль
			</div>
			<div className='add__items'>
				<RolesFrom fetchData={fetchData} />
			</div>
			<div className='add__title' style={{ marginTop: '20px' }}>
				Список ролей
			</div>
			<div className={styles.list}>
				<div className={styles.list__header}>
					<div>id</div>
					<div>Роль</div>
					<div>Описание</div>
					<div></div>
					<div></div>
				</div>
				{dataList &&
					dataList.map((el, index) => (
						<RolesListFrom
							element={el}
							key={el.id}
							index={index}
							fetchData={fetchData}
						/>
					))}
			</div>
		</>
	)
}
export default RolesList
