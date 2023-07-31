export default function numberWithCommas(num: string) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
