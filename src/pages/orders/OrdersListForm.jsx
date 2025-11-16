import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router'
import { deleteOrder, updateOrder } from '../../api/orders/orderService'
import FormInputText from '../../UI/input/FormInputText'
import Select from '../../UI/select/Select'
import styles from './OrdersPage.module.scss'
const OrdersListForm = ({
	element,
	index,
	fetchData,
	id_client,
	manager,
	id_car,
}) => {
	const handleDelete = async () => {
		try {
			const res = await deleteOrder(element.id)
			if (res) {
				alert('Заказ удален!')
				fetchData()
			}
		} catch (err) {
			console.error('Ошибка при удалении заказа:', err)

			if (err.response?.data?.error) {
				alert(`Ошибка: ${err.response.data.error}`)
			} else {
				alert('Ошибка сети или сервера')
			}
		}
	}
	const onSubmit = async data => {
		try {
			data['client_id'] = id_client
			data['car_id'] = id_car
			const res = await updateOrder(element.id, data)
			fetchData()
			if (res) {
				alert('Заказ обновлен!')
			}
		} catch (err) {
			console.error('Ошибка при обновлении авто:', err)

			if (err.response?.data?.error) {
				alert(`Ошибка: ${err.response.data.error}`)
			} else {
				alert('Ошибка сети или сервера')
			}
		}
	}

	const onError = errors => {
		const firstKey = Object.keys(errors)[0]
		const err = errors[firstKey]?.message
	}
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm()

	return (
		<form
			onSubmit={handleSubmit(onSubmit, onError)}
			className={styles.car__item}
		>
			<div className={styles.list__items}>
				<div className={styles.list__id}>{index + 1}</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Менеджер</p>
					<Select
						name='manager_id'
						control={control}
						options={manager}
						rules={{ required: 'Выберите менеджера' }}
						placeholder='Менеджер'
						defaultValue={element.manager_id}
					/>
				</div>

				<div className={styles.form__item}>
					<p className={styles.form__label}>Дата приема</p>
					<div className={styles.date}>
						{new Date(element.opened_at)
							.toLocaleDateString('ru-RU', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
							})
							.split('.')
							.join('-')}
					</div>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Дата закрытия</p>
					<div className={styles.date}>
						{element.closed_at
							? new Date(element.opened_at)
									.toLocaleDateString('ru-RU', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									})
									.split('.')
									.join('-')
							: 'открыт'}
					</div>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Статус заказа</p>
					<Select
						name='status'
						control={control}
						options={[
							{ value: 'выполнен', label: 'выполнен' },
							{ value: 'оплачен', label: 'оплачен' },
							{ value: 'в_работе', label: 'в_работе' },
							{ value: 'отменён', label: 'отменён' },
							{ value: 'новый', label: 'новый' },
						]}
						defaultValue={element.status}
						rules={{ required: 'Выберите статус' }}
						placeholder='Статус'
					/>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Комментарий</p>
					<FormInputText
						control={control}
						name={'comment'}
						placeholder='Комментарий'
						defaultValue={element.comment}
					/>
				</div>
			</div>
			<div className={styles.car_button}>
				<button className='btn-edit'>edit</button>
				<button
					type='button'
					className='btn-del'
					onClick={() => handleDelete()}
				>
					del
				</button>

				<NavLink
					to={`/order/details/${element.id}`}
					className='router-link active-link'
					state={{
						element: element,
						id_client: id_client,
						id_car: id_car,
					}}
				>
					{'Заполнить заказ-наряд ->'}
				</NavLink>
			</div>
		</form>
	)
}
export default OrdersListForm
