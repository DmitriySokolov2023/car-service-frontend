import { useForm } from 'react-hook-form'
import { deletePart, updatePart } from '../../api/parts/parts'
import FormInputText from '../../UI/input/FormInputText'
import styles from './PartsPage.module.scss'

const PartsListForm = ({ element, index, fetchData }) => {
	const handleDelete = async () => {
		try {
			const res = await deletePart(element.id)
			if (res) {
				alert('Запчасть удалена!')
				fetchData()
			}
		} catch (err) {
			console.error('Ошибка при удалении запчасти:', err)

			if (err.response?.data?.error) {
				alert(`Ошибка: ${err.response.data.error}`)
			} else {
				alert('Ошибка сети или сервера')
			}
		}
	}
	const onSubmit = async data => {
		try {
			const res = await updatePart(element.id, data)
			if (res) {
				alert('Запчасть обновлена!')
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
			<FormInputText
				control={control}
				name={'part_number'}
				rules={{ required: 'Введите серийный № услуги!' }}
				placeholder={'Введите серийный № услуги!'}
				defaultValue={element.part_number}
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
				name={'unit'}
				rules={{ required: 'Введите ед.изм!' }}
				placeholder='ед.изм'
				defaultValue={element.unit}
			/>
			<FormInputText
				control={control}
				name={'price'}
				rules={{ required: 'Введите цену!' }}
				placeholder={'Цена'}
				defaultValue={element.price}
			/>
			<FormInputText
				control={control}
				name={'stock_qty'}
				rules={{ required: 'Введите кол-во на складе!' }}
				placeholder={'Введите кол-во на складе'}
				defaultValue={element.stock_qty || '0'}
			/>

			<button className='btn-edit'>edit</button>
			<button type='button' className='btn-del' onClick={() => handleDelete()}>
				del
			</button>
		</form>
	)
}
export default PartsListForm
