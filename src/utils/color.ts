export default {
	// hex颜色转rgb颜色
	HexToRgb(str: string): number[] {
		str = str.replace('#', '')
		const hxs = str.match(/../g) || []
		const result = hxs.map((item: { toString: () => string }) => parseInt(item.toString(), 16))
		return result
	},
	// rgb颜色转hex颜色
	RgbToHex(a: number, b: number, c: number): string {
		const hexs = [a.toString(16), b.toString(16), c.toString(16)]
		for (let i = 0; i < 3; i++) {
			if (hexs[i].length === 1) {
				hexs[i] = '0' + hexs[i]
			}
		}
		return '#' + hexs.join('')
	},
	// 加深
	darken(color: string, level: number): string {
		const rgbc = this.HexToRgb(color)
		for (let i = 0; i < 3; i++) {
			rgbc[i] = Math.floor(Number(rgbc[i]) * (1 - level))
		}
		return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
	},
	// 变淡
	lighten(color: string, level: number) {
		const rgbc = this.HexToRgb(color)
		for (let i = 0; i < 3; i++) {
			rgbc[i] = Math.floor(Number((255 - Number(rgbc[i])) * level + rgbc[i]))
		}
		return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
	},
}
