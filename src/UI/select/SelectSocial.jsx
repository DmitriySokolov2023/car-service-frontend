import { useState } from 'react'
import { Controller } from 'react-hook-form'
import styles from './Select.module.scss'

export default function SelectSocial({
	name,
	control,
	options,
	rules,
	defaultValue,
	placeholder,
	onSelectChange,
}) {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue ?? null}
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

	// Теперь label вычисляется динамически каждый рендер
	const selectedLabel = options.find(opt => opt.value === value)?.label ?? ''

	const handleSelect = val => {
		onChange(val)
		setOpen(false)
	}

	return (
		<div className={styles.container}>
			<div
				className={`${styles.control} ${
					!selectedLabel ? styles.placeholder : ''
				}`}
				onClick={() => setOpen(prev => !prev)}
			>
				{selectedLabel || placeholder}
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
