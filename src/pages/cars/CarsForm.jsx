import { useForm } from 'react-hook-form'
import { createClient } from '../../api/clients/clients'
import FormInputText from '../../UI/input/FormInputText'
import styles from './CarsPage.module.scss'

const CarsForm = ({ fetchData }) => {
	const onSubmit = async data => {
		try {
			data['is_company'] = data.is_company === 1 ? false : true

			console.log(data)
			const res = await createClient(data)
			if (res) {
				alert('Клиент добавлен!')
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
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Гос.номер</p>
				<FormInputText
					control={control}
					name={'email'}
					rules={{ required: 'Введите гос.номер!' }}
					placeholder={'Гос.номер'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Год</p>
				<FormInputText
					control={control}
					name={'year'}
					rules={{ required: 'Введите год!' }}
					placeholder={'Год'}
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
export default CarsForm
