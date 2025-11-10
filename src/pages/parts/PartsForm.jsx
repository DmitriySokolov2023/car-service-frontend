import { useForm } from 'react-hook-form'
import { createPart } from '../../api/parts/parts'
import FormInputText from '../../UI/input/FormInputText'
import styles from './PartsPage.module.scss'

const PartsForm = ({ role, fetchData }) => {
	const onSubmit = async data => {
		try {
			const res = await createPart(data)
			if (res) {
				alert('Деталь добавлена!')
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
				<p className={styles.form__label}>Серийный №</p>
				<FormInputText
					control={control}
					name={'part_number'}
					rules={{ required: 'Введите серийный номер детали!' }}
					placeholder={'Серийный №'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Название детали</p>
				<FormInputText
					control={control}
					name={'name'}
					rules={{ required: 'Введите название детали!' }}
					placeholder={'Название детали'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>ед.изм</p>
				<FormInputText
					control={control}
					name={'unit'}
					rules={{ required: 'Введите ед.изм!' }}
					placeholder={'ед.изм'}
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Цена</p>
				<FormInputText
					control={control}
					name={'price'}
					rules={{ required: 'Введите цену!' }}
					placeholder='Цена'
				/>
			</div>
			<div className={styles.form__item}>
				<p className={styles.form__label}>Кол-во на складе</p>
				<FormInputText
					control={control}
					name={'stock_qty'}
					rules={{ required: 'Введите количество на складе!' }}
					placeholder={'Количество на складе'}
				/>
			</div>

			<button className='btn-submit' style={{ marginTop: '20px' }}>
				Создать
			</button>
		</form>
	)
}
export default PartsForm
