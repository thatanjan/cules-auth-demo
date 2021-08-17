export default ({ res, code, message, thingsToInclude }) =>
	res.status(code).json({ message, ...thingsToInclude })
