## egg重写博客接口
之前用React全家桶和Java的SpringBoot重构了自己的个人博客，虽然做出来了，但是还是初成版，自我感觉还是存在很多问题。由于对Java不是完全熟悉，所以写出来的接口可能有些瑕疵，所以最近学习了eggjs，使用了egg重写了后台接口。

### 项目
**项目地址**：[https://github.com/k-water/egg-blog](https://github.com/k-water/egg-blog)(喜欢的请点个star^_^)

**运行**

``` bash
#1
git clone https://github.com/k-water/egg-blog.git

#2 
cd egg-blog
npm install

#3
修改config.default.js中sequelize的配置
mysql的账号密码改为自己的

#4
npm run dev

#5 单元测试
npm test

#6 本地测试
npm run test-local
```
### 流程

#### 参考文档
[Egg官方文档](eggjs.org/zh-cn/intro/)

[Sequelize(英文)](http://docs.sequelizejs.com/manual/installation/getting-started.html)

[Sequelize(中文)](https://github.com/demopark/sequelize-docs-Zh-CN)

#### 技术选型

后台框架：Egg
数据库：Mysql
插件：egg-sequelize
#### 接口测试

工具：PostMan

#### 数据库设计

数据库设计跟之前的也略有不同，差别的是各实体之间的联系。
实体有
> 
* blogs
* comments
* users
* catalogs
* authorities(用户角色)

**ER图如下**

![](https://oc1gyfe6q.qnssl.com/18-3-15/51890030.jpg)

**实体之间联系**

![](https://oc1gyfe6q.qnssl.com/18-3-15/91803747.jpg)

#### 开发的接口

![](https://oc1gyfe6q.qnssl.com/18-3-15/50736292.jpg)

#### 个人总结

基于学习的态度，重写了博客的后台接口，总的来说，egg使用起来还是挺方便的，官方文档写的也很好，基本遇到问题都能在官方issue找到类似的回答，写起来有点像Java的感觉。
这次让我学习到的是，基础要扎实，像数据库的设计这方面，如果学不好，那一开始也无法下手，写出来的接口肯定也是不够好，因为要考虑返回数据格式的问题，什么接口返回什么格式等等。所以基础还是很重要的，之前学的时候一直认为没什么用，反正我又用不到，但是在实践中才发现，这些技能都是需要具备的，干起活来才能事半功倍。另外一点就是要仔细阅读文档，不要急于下手写代码，对一个框架有了初步的掌握，才去下手，那样遇到问题也能快速定位到错误的位置。
以上，就是个人的小小体会啦~

### 接口文档

[API接口文档](http://sunshinelzb.coding.me/)
