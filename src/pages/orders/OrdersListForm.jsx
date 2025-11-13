import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router'
import { deleteCar, updateCar } from '../../api/cars/cars'
import FormInputText from '../../UI/input/FormInputText'
import styles from './OrdersPage.module.scss'
const OrdersListForm = ({ element, index, fetchData, id_client }) => {
	const handleDelete = async () => {
		try {
			const res = await deleteCar(element.id)
			if (res) {
				alert('Авто удален!')
				fetchData()
			}
		} catch (err) {
			console.error('Ошибка при удалении авто:', err)

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
			console.log(data)
			const res = await updateCar(element.id, data)
			if (res) {
				alert('Авто обновлено!')
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
					<p className={styles.form__label}>Марка</p>
					<FormInputText
						control={control}
						name={'make'}
						rules={{ required: 'Введите марку!' }}
						placeholder={'Марка'}
						defaultValue={element.make}
					/>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Модель</p>
					<FormInputText
						control={control}
						name={'model'}
						rules={{ required: 'Введите модель!' }}
						placeholder={'Модель'}
						defaultValue={element.model}
					/>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>VIN</p>
					<FormInputText
						control={control}
						name={'vin'}
						rules={{ required: 'Введите vin!' }}
						placeholder='VIN'
						maxLength={17}
						minLength={17}
						defaultValue={element.vin}
					/>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Гос.номер</p>
					<FormInputText
						control={control}
						name={'license_plate'}
						rules={{ required: 'Введите гос.номер!' }}
						placeholder={'А000АА152'}
						maxLength={17}
						minLength={8}
						defaultValue={element.license_plate}
					/>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Год</p>
					<FormInputText
						control={control}
						name={'year'}
						rules={{ required: 'Введите год!' }}
						placeholder={'2025'}
						maxLength={10}
						defaultValue={element.year}
					/>
				</div>
				<div className={styles.form__item}>
					<p className={styles.form__label}>Пробег</p>
					<FormInputText
						control={control}
						name={'mileage'}
						rules={{ required: 'Введите пробег!' }}
						placeholder={'Пробег'}
						defaultValue={element.mileage}
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

				<NavLink to={`/clients`} className='router-link active-link'>
					{'Оформить заказ-наряд ->'}
				</NavLink>
			</div>
		</form>
	)
}
export default OrdersListForm
