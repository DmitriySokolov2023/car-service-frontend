import { useEffect, useState } from 'react'
import { getAllClients } from '../../api/clients/clients'
import ClientsForm from './ClientsForm'
import ClientsListForm from './ClientsListForm'
import styles from './ClientsPage.module.scss'

const ClientsList = () => {
	const [dataList, setDataList] = useState([])

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
				Добавить клиента
			</div>
			<div className='add__items'>
				<ClientsForm fetchData={fetchData} />
			</div>
			<div className='add__title' style={{ marginTop: '20px' }}>
				Список клиентов
			</div>
			<div className={styles.list}>
				<div className={styles.list__header}>
					<div>id</div>
					<div>Тип</div>
					<div>ФИО</div>
					<div>Телефон</div>
					<div>Email</div>
					<div>Комментарий</div>
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
export default ClientsList
