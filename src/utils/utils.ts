/**
 * @description 获取静态图片
 * @param {string} url 图片路径
 * @returns {URL} 图片路径
 */
const getImageUrl = (url: string) => {
	return new URL(`/src/assets/img/${url}`, import.meta.url).href
}

export { getImageUrl }
