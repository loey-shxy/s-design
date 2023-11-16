module.exports = {
  // 一行最多字符数
  printWidth: 150,
  // 每个缩进空格数
  tabWidth: 2,
  // 使用制表符
  useTabs: true,
  // 语句末尾是否需要分号
  semi: false,
  // 是否使用单引号
  singleQuote: true,
  // 更改引用对象属性的事件
  quoteProps: 'as-needed',
  // 在 JSX 中使用单引号
  jsxSingleQuote: true,
  // 多行时尽可能打印尾随逗号
  trailingComma: 'es5',
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // JSX 标签的反尖括号需要换行
  // jsxBracketSameLine: true,
  // 在单独的箭头函数参数周围包括括号 
  arrowParens: 'always',
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的执行标准 always/never/preserve
  proseWrap: 'preserve',
  // 使用默认HTML文件的全局空格敏感度 css/strict/ignore
  htmlWhitespaceSensitivity: 'css',
  // Vue 文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  endOfLine: 'auto'

}

// module.exports = {
//   tabWidth: 2,
//   jsxSingleQuote: true,
//   jsxBracketSameLine: true,
//   printWidth: 100,
//   singleQuote: true,
//   semi: false,
//   endOfLine: 'auto',
//   overrides: [
//     {
//       files: '*.json',
//       options: {
//         printWidth: 200,
//       },
//     },
//   ],
//   arrowParens: 'always',
// }
