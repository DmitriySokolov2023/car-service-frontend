import { useForm } from 'react-hook-form'
import { deleteClient, updateClient } from '../../api/clients/clients'
import FormInputText from '../../UI/input/FormInputText'
import Select from '../../UI/select/Select'
import styles from './CarsPage.module.scss'
const CarsListForm = ({ element, index, fetchData }) => {
	const handleDelete = async () => {
		try {
			const res = await deleteClient(element.id)
			if (res) {
				alert('Клиент удален!')
				fetchData()
			}
		} catch (err) {
			console.error('Ошибка при удалении клиента:', err)

			if (err.response?.data?.error) {
				alert(`Ошибка: ${err.response.data.error}`)
			} else {
				alert('Ошибка сети или сервера')
			}
		}
	}
	const onSubmit = async data => {
		try {
			const res = await updateClient(element.id, data)
			if (res) {
				alert('Клиент обновлен!')
			}
		} catch (err) {
			console.error('Ошибка при обновлении запчасти:', err)

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
			className={styles.list__items}
		>
			<div className={styles.list__id}>{index + 1}</div>
			<Select
				name='is_company'
				control={control}
				options={[
					{ value: 1, label: 'Физ.лицо' },
					{ value: 2, label: 'Компания' },
				]}
				rules={{ required: 'Укажите тип' }}
				defaultValue={element.is_company === false ? 1 : 2}
				placeholder='Тип'
			/>
			<FormInputText
				control={control}
				name={'name'}
				rules={{ required: 'Введите название детали!' }}
				placeholder={'Введите название детали'}
				defaultValue={element.name}
			/>
			<FormInputText
				control={control}
				name={'phone'}
				rules={{ required: 'Введите телефон!' }}
				placeholder='+7 (___) ___-__-__'
				defaultValue={element.phone}
			/>
			<FormInputText
				control={control}
				name={'email'}
				rules={{ required: 'Введите email!' }}
				placeholder={'Email'}
				defaultValue={element.email}
			/>
			<FormInputText
				control={control}
				name={'comment'}
				placeholder={'Введите комментарий'}
				defaultValue={element.comment}
			/>

			{/* <NavLink
				to='/debt-admin'
				className='router-link active-link'
				// state={{
				// 	course: state?.filterCourse,
				// 	liter: state?.filterLiter,
				// 	site: state?.filterSite,
				// }}
			>
				Вернуться к списку учеников
			</NavLink> */}
			<button className='btn-edit'>edit</button>

			<button type='button' className='btn-del' onClick={() => handleDelete()}>
				del
			</button>
		</form>
	)
}
export default CarsListForm
