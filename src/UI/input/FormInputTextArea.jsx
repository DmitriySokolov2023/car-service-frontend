import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from './InputSearch.module.scss'

const InputText = ({ placeholder, value, onChange, type = null }) => {
	const [text, setText] = useState(value || '')

	const handleChange = e => {
		const val = e.target.value
		setText(val)
		onChange(type === 'number' ? (val === '' ? '' : parseFloat(val)) : val)
	}

	return (
		<div className={styles.inputWrapper}>
			<textarea
				value={text}
				onChange={handleChange}
				placeholder={placeholder}
				className={styles.textarea}
				rows={3} // минимальное количество строк
			/>
		</div>
	)
}

export default function FormInputTextArea({ name, control, rules, placeholder, type }) {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue=""
			render={({ field, fieldState }) => (
				<div className={styles.wrapper}>
					<InputText
						placeholder={placeholder}
						value={field.value}
						onChange={field.onChange}
						type={type}
					/>
					{fieldState.error && (
						<span className={styles.error}>{fieldState.error.message}</span>
					)}
				</div>
			)}
		/>
	)
}
