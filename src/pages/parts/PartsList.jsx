import { useEffect, useState } from 'react'
import { getAllParts } from '../../api/parts/parts'
import PartsForm from './PartsForm'
import PartsListForm from './PartsListForm'
import styles from './PartsPage.module.scss'

const PartsList = () => {
	const [dataList, setDataList] = useState([])

	const fetchData = async () => {
		const { items } = await getAllParts()
		if (items) setDataList(items)
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className='add__title' style={{ marginBottom: '10px' }}>
				Добавить услугу
			</div>
			<div className='add__items'>
				<PartsForm fetchData={fetchData} />
			</div>
			<div className='add__title' style={{ marginTop: '20px' }}>
				Список услуг
			</div>
			<div className={styles.list}>
				<div className={styles.list__header}>
					<div>id</div>
					<div>Серийный №</div>
					<div>Название детали</div>
					<div>ед.изм</div>
					<div>Цена</div>
					<div>Описание</div>
					<div></div>
					<div></div>
				</div>
				{dataList &&
					dataList.map((el, index) => (
						<PartsListForm
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
export default PartsList
