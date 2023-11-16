/**
 * @description layout 配置
 */
export interface SystemSettings {
	systemName?: string
	mainColor?: string
	themeMode?: string
	userName?: string
	collapse?: boolean
}

/**
 * @description 左侧菜单
 */
export interface MenuInterface {
	url: string // 路由path
	isMenu: boolean // 是否为菜单
	icon: string // 菜单图标
	menuName: string // 菜单名称
	route: boolean // 是否为路由
	children?: MenuInterface[] // 子路由
}

/**
 * @description nav menu
 */
export interface NavMenuItem {
	name: string
	code: string
	path: string
}

/**
 * @description layout接收参数
 */
export interface SLayoutParams {
	SystemSettings: SystemSettings // 系统基础配置
	cacheCheComponents: string[] // 缓存的组件
	menus: MenuInterface[] // 系统菜单
	removeCacheComponent: (...args: any[]) => any // 移除某个缓存的组件
	navMenu: NavMenuItem[] // header上的下拉菜单
	handleClickNavMenu: (...args: any[]) => void // header上的下拉菜单点击事件
}
