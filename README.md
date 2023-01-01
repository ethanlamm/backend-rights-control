# 前端权限控制

## 菜单的控制

在登录请求中，需要后端返回权限数据，前端根据权限数据，展示对应的菜单，点击菜单才能看到相关页面。

## 页面的控制

- 如果用户没有登录，手动在地址栏敲入管理页面的地址，需要跳转到登录页面。
- 如果用户已经登录，手动敲入非权限内的地址，需要跳转404页面

## 按钮的控制

在某个菜单的页面中，根据权限数据，展示可进行操作的按钮，比如删除，修改，增加

## 请求和响应的控制

如果用户通过非常规操作，比如通过浏览器调试工具将某些禁用的按钮变成启用状态，此时点击按钮发出的请求需要被前端所拦截
