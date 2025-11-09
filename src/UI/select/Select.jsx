import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from './Select.module.scss'

export default function Select({
	name,
	control,
	options,
	rules,
	defaultValue,
	placeholder,
	onSelectChange,
	type,
}) {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			type={type}
			defaultValue={defaultValue || ''}
			render={({ field, fieldState }) => (
				<div className={styles.wrapper}>
					<CustomSelect
						value={field.value}
						onChange={val => {
							field.onChange(val)
							if (onSelectChange) onSelectChange(val)
						}}
						options={options}
						placeholder={placeholder}
					/>
					{fieldState.error && (
						<span className={styles.error}>{fieldState.error.message}</span>
					)}
				</div>
			)}
		/>
	)
}

function CustomSelect({ value, onChange, options, placeholder }) {
	const [open, setOpen] = useState(false)

	const handleSelect = val => {
		onChange(val)
		setOpen(false)
	}

	return (
		<div className={styles.container}>
			<div
				className={`${styles.control} ${!value ? styles.placeholder : ''}`}
				onClick={() => setOpen(prev => !prev)}
			>
				{value === '' || value === null
					? placeholder
					: options.find(opt => opt.value === value)?.label}
			</div>

			{open && (
				<ul className={styles.dropdown}>
					{options.map(opt => (
						<li
							key={opt.value}
							className={`${styles.option} ${
								opt.value === value ? styles.selected : ''
							}`}
							onClick={() => handleSelect(opt.value)}
						>
							{opt.label}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
