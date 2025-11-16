import { useForm } from 'react-hook-form'

const OrdersDetailsForm = () => {
	const onSubmit = async data => {
		try {
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
		<form onSubmit={handleSubmit(onSubmit, onError)}>
			<div>Модуль в разработке</div>
			{/* <div>Информация о заказ-наряде</div>
			<div>Информация о клиенте</div>
			<div>Информация об автомобиле</div>
			<div>Услуги и запчасти</div> */}
			{/* <div className={styles.form__item}>
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
					defaultValue={'новый'}
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
				/>
			</div>

			<button className='btn-submit' style={{ marginTop: '20px' }}>
				Создать
			</button> */}
		</form>
	)
}
export default OrdersDetailsForm
