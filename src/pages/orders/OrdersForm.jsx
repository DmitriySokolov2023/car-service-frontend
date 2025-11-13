import { useForm } from 'react-hook-form'
import { createCar } from '../../api/cars/cars'
import FormInputText from '../../UI/input/FormInputText'
import styles from './OrdersPage.module.scss'

const OrdersForm = ({ fetchData, id_client }) => {
	const onSubmit = async data => {
		data['client_id'] = id_client
		try {
			console.log(data)
			const res = await createCar(data)
			if (res) {
				alert('Автомобиль добавлен!')
			}
			fetchData()
			reset()
		} catch (err) {
			console.error('Ошибка при создании детали:', err)

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
		reset,
		formState: { errors },
	} = useForm()

	return (
		<form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Марка</p>
				<FormInputText
					control={control}
					name={'make'}
					rules={{ required: 'Введите марку!' }}
					placeholder={'Марка'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Модель</p>
				<FormInputText
					control={control}
					name={'model'}
					rules={{ required: 'Введите модель!' }}
					placeholder={'Модель'}
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
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Пробег</p>
				<FormInputText
					control={control}
					name={'mileage'}
					rules={{ required: 'Введите пробег!' }}
					placeholder={'Пробег'}
				/>
			</div>

			<button className='btn-submit' style={{ marginTop: '20px' }}>
				Создать
			</button>
		</form>
	)
}
export default OrdersForm
