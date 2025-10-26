import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { searchPost } from '../../../api/form-motivations/motivationsForm.js'
import styles from '../InputSearch.module.scss'

const InputSearch = ({ value, placeholder, onSelect, onClear }) => {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState([])

	useEffect(() => {
		setQuery(value || '')
	}, [value])

	const handleChange = async e => {
		const value = e.target.value
		setQuery(value)

		// если поле очистили — сбросить форму
		if (!value) {
			setResults([])
			onClear?.()
			return
		}

		if (value.length > 2) {
			try {
				const data = await searchPost(value)

				setResults(data || [])
			} catch (err) {
				console.error('Ошибка поиска:', err)
			}
		} else {
			setResults([])
		}
	}

	return (
		<div className={styles.inputWrapper}>
			<input
				type='text'
				value={query}
				onChange={handleChange}
				placeholder={placeholder}
				className={styles.input}
			/>
			{results.length > 0 && (
				<ul className={styles.suggestions}>
					{results.map((emp, index) => (
						<li
							key={`post_li_${emp.id_post}_${index}`}
							onClick={() => {
								setQuery(emp.post)
								setResults([])
								onSelect(emp)
							}}
						>
							{emp.post} - {emp.division}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default function FormInputPost({
	name,
	control,
	rules,
	placeholder,
	onSelectExtra,
	setData,
}) {
	const [selectedItem, setSelectedItem] = useState(null)

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue=''
			render={({ field, fieldState }) => (
				<div className={styles.wrapper}>
					<InputSearch
						placeholder={placeholder}
						value={selectedItem ? selectedItem.post : ''}
						onSelect={item => {
							setSelectedItem(item)
							field.onChange(item.id_post) // записываем ID в форму
							onSelectExtra?.(item)
							setData && setData(item)
						}}
						onClear={() => {
							setSelectedItem(null)
							field.onChange('') // сброс значения формы
						}}
					/>
					{fieldState.error && (
						<span className={styles.error}>{fieldState.error.message}</span>
					)}
				</div>
			)}
		/>
	)
}
