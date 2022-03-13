# vue-admin-razzh

个人后台模版搭建中

写法借鉴：

+ https://github.com/PanJiaChen/vue-element-admin

+ https://github.com/gcddblue/vue-admin-webapp

## 从中学到了什么

### require.context: 检索指定文件夹下的所有文件

+ Params1 要检索的目录
+ Params2 是否递归目录中的子文件夹
+ Params3 检索文件的条件，筛选以什么后缀结尾的文件
+ 返回值： function 项目中以files变量命名
  + 函数下的属性方法：
  + keys(Params1)  返回一个以检索文件相对该文件夹的相对路径
  + Params1: 传入相对路径返回检索文件的导出模块
    + files.keys(files.keys()[index])

### 登陆流程

axios

1、请求拦截器检查用户是否存在token

去到store.getters.token中拿到state中的token数据

+ 若存在，在Http请求头上添加token
+ 否则返回Promise.reject(error)

2、响应拦截器检查是否请求成功

+ 关闭loading
+ code >= 200 && code < 300 || code === 304 返回Promise.resolve(data)
+ 错误情况返回Promise.reject(data)

3、 Vuex在登陆中的作用：方便管理异步数据

action:

发送异步请求，发送用户数据到服务端

若请求成功 commit('SET_TOKEN',token)往localStorage存入token，再将token存入state中

4、router.beforeEach扮演的角色

1、路由拦截

若访问/login页面，放行

+ 若访问其他页面，判断本地是否存在token，并判断用户是否有`权限`访问该页面
  + 有权限 -> 放行
  + 无权限 -> 请求用户权限信息 -> 动态添加路由
+ 若本地不存在`token`跳转登陆页

## 移动端适配思路

![avatar](https://github.com/rzhAvenir/vue-admin-webapp/blob/dev/img/mobile.png)

