import { useForm } from 'react-hook-form'
import { deleteService, updateService } from '../../api/services/services'
import FormInputText from '../../UI/input/FormInputText'
import styles from './ServicesPage.module.scss'

const ServicesListForm = ({ element, index, fetchData }) => {
	const handleDelete = async () => {
		try {
			const res = await deleteService(element.id)
			if (res) {
				alert('Услуга удалена!')
				fetchData()
			}
		} catch (err) {
			console.error('Ошибка при удалении сотрудника:', err)

			if (err.response?.data?.error) {
				alert(`Ошибка: ${err.response.data.error}`)
			} else {
				alert('Ошибка сети или сервера')
			}
		}
	}
	const onSubmit = async data => {
		try {
			if (data['active'] === '') {
				data['active'] = false
			}
			const res = await updateService(element.id, data)
			if (res) {
				alert('Услуга обновлена!')
			}
		} catch (err) {
			console.error('Ошибка при обновлении услуги:', err)

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

			<FormInputText
				control={control}
				name={'name'}
				rules={{ required: 'Введите услугу!' }}
				placeholder={'Услуга'}
				defaultValue={element.name}
			/>
			<FormInputText
				control={control}
				name={'unit'}
				rules={{ required: 'Введите ед.изм!' }}
				placeholder='ед.изм'
				defaultValue={element.unit}
			/>
			<FormInputText
				control={control}
				name={'base_price'}
				rules={{ required: 'Введите цену!' }}
				placeholder={'Цена'}
				defaultValue={element.base_price}
			/>
			<FormInputText
				control={control}
				name={'description'}
				rules={{ required: 'Введите описание!' }}
				placeholder={'Описание'}
				defaultValue={element.description}
			/>

			<button className='btn-edit'>edit</button>
			<button type='button' className='btn-del' onClick={() => handleDelete()}>
				del
			</button>
		</form>
	)
}
export default ServicesListForm
