import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite' // ui 库自动引入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import eslintPlugin from 'vite-plugin-eslint'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		server: {
			port: 5000,
			host: '0.0.0.0',
			proxy: {
				'/api': {
					target: '0.0.0.0',
					changeOrigin: true,
				},
			},
		},
    resolve: {
			alias: {
				'@': resolve(__dirname, './src'),
				'@components': resolve(__dirname, 'src/components'),
			},
		},
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/packages/theme-chalk/common/element-variable.scss" as *;`,
        },
      },
    },
		plugins: [
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name: string) => {
              return `element-plus/theme-chalk/${name}.css`
            }
          }
        ]
      }),
			vue(),
			// 让v3的setup语法糖增强，可在script 标签上添加name属性指定组件名
			// 在使用setup时，没法直接为组件定义name，需要使用两个标签
			VueSetupExtend(),
			// 自动引入Api
			AutoImport({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
				// 自定义文件生成位置，默认根目录下
				dts: 'src/auto-imports.d.ts',
				imports: ['vue', 'vue-router'],
			}),
			Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
      }),
			eslintPlugin({
				include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
			}),
			dts({
				skipDiagnostics: true,
				exclude: './src/example',
				include: './src',
				insertTypesEntry: true,
				copyDtsFiles: false,
			}),
		],
		build: {
			outDir: 's-design',
			rollupOptions: {
				external: ['vue'],
				output: {
					globals: {
						vue: 'vue',
					},
				},
			},
			lib: {
				entry: './src/packages/components/index.ts',
				name: 'sDesign',
				fileName: 'sDesign',
				formats: ['es'],
			},
		},
	}
})
