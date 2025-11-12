import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { getAllClients } from '../../api/clients/clients'
import CarsForm from './CarsForm'
import ClientsListForm from './CarsListForm'
import styles from './CarsPage.module.scss'

const CarsList = () => {
	const [dataList, setDataList] = useState([])
	const location = useLocation()
	const { id_client } = useParams()
	const fio = location.state?.fio || null
	const fetchData = async () => {
		const { items } = await getAllClients()
		if (items) setDataList(items)
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className='add__title' style={{ marginBottom: '10px' }}>
				Добавить автомобиль клиенту № {id_client} ({fio})
			</div>
			<div className='add__items'>
				<CarsForm fetchData={fetchData} />
			</div>
			<div className='add__title' style={{ marginTop: '20px' }}>
				Список автомобилей клиента
			</div>
			<div className={styles.list}>
				<div className={styles.list__header}>
					<div>id</div>
					<div>Марка</div>
					<div>Модель</div>
					<div>VIN</div>
					<div>Гос.номер</div>
					<div>Год</div>
					<div>Пробег</div>
					<div></div>
					<div></div>
				</div>
				{dataList &&
					dataList.map((el, index) => (
						<ClientsListForm
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
export default CarsList
