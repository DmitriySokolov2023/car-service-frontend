import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from './InputSearch.module.scss'

const InputText = ({
	placeholder,
	value,
	onChange,
	type = null,
	width = null,
	minLength = null,
	maxLength = null,
}) => {
	const [text, setText] = useState(value || '')
	useEffect(() => {
		setText(value || '')
	}, [value])

	const handleChange = e => {
		const val = e.target.value
		setText(val)
		onChange(type === 'number' ? (val === '' ? '' : parseFloat(val)) : val)
	}

	return (
		<div
			className={width ? styles.inputWrapperWidth : styles.inputWrapper}
			style={width && { width: width }}
		>
			<input
				type='text'
				value={text}
				onChange={handleChange}
				placeholder={placeholder}
				className={styles.input}
				minLength={minLength}
				maxLength={maxLength}
			/>
		</div>
	)
}

export default function FormInputText({
	name,
	control,
	rules,
	placeholder,
	type,
	defaultValue = '',
	width = null,
	minLength = null,
	maxLength = null,
}) {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue}
			render={({ field, fieldState }) => (
				<div className={styles.wrapper}>
					<InputText
						placeholder={placeholder}
						value={field.value}
						onChange={field.onChange}
						type={type}
						width={width}
						minLength={minLength}
						maxLength={maxLength}
					/>
					{fieldState.error && (
						<span className={styles.error}>{fieldState.error.message}</span>
					)}
				</div>
			)}
		/>
	)
}
