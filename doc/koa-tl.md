#koa-view
使用view模板引擎的时候，有两个坑的地方
1:在使用
``` javascript
app.use(views(path.resolve(__dirname, '../views')))
```
其中路径的使用一定要注意```reolve(__dirfname)```是运行node所在的目录地址
2：模板引擎在使用render渲染是，一定要用await修饰，ctx.render 是一个异步渲染的过程