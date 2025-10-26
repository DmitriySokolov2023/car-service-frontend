export const validateNumber = value => {
	return !isNaN(parseFloat(value)) && isFinite(value) ? Number(value) : null
}
