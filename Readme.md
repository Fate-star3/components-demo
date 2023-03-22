## 项目模板

#### "src/\*_/_.{js?(x),ts?(x)}" 是什么意思？

“_”：匹配所有文件 例：src/_.js(包含 src 下的所有 js 文件)；
“**”：匹配 0 个或多个子文件夹 例：src/**/_.js(包含 src 的 0 个或多个子文件夹下的 js 文件)；
“{}”：匹配多个属性 例：src/{a,b}.js(包含 a.js 和 b.js 文件) src/_.{jpg,png,gif}(src 下的所有 jpg/png/gif 文件)；
“!”：排除文件 例：!src/a.js(不包含 src 下的 a.js 文件)；
