import { useEffect, useState } from 'react'
import { getAllServices } from '../../api/services/services'
import ServicesForm from './ServicesForm'
import ServicesListForm from './ServicesListForm'
import styles from './ServicesPage.module.scss'

const ServicesList = () => {
	const [dataList, setDataList] = useState([])

	const fetchData = async () => {
		const { items } = await getAllServices()
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
				<ServicesForm fetchData={fetchData} />
			</div>
			<div className='add__title' style={{ marginTop: '20px' }}>
				Список услуг
			</div>
			<div className={styles.list}>
				<div className={styles.list__header}>
					<div>id</div>
					<div>Услуга</div>
					<div>ед.изм</div>
					<div>Цена</div>
					<div>Описание</div>
					<div></div>
					<div></div>
				</div>
				{dataList &&
					dataList.map((el, index) => (
						<ServicesListForm
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
export default ServicesList
