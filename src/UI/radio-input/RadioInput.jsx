import { Controller } from 'react-hook-form'
import styles from './RadioInput.module.scss'
const RadioInput = ({ control, name, data, rules, line = false }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue=''
			rules={rules}
			render={({ field }) => (
				<div className={line ? styles.form__label_line : ''}>
					{data.map(el => (
						<label key={el} className={styles.form__label}>
							<input
								type='radio'
								value={el}
								checked={field.value === el}
								onChange={() => field.onChange(el)}
								className={line ? styles.form__label_line : styles.form__input}
							/>
							<p>{el}</p>
						</label>
					))}
				</div>
			)}
		/>
	)
}
export default RadioInput
