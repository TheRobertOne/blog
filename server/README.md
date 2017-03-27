# mongoose_CRUD
ExpressJS+Mongoose的增删改查
### 安装nodemon 
#### npm i nodemon -g
### 启动
#### nodemon start (记得开启 mongoDB 哦！)
#### localhost:3000
### API
---------------------------------------------------------------------------------------------------------

| 操作          |  请求方式                         | 参数  |   说明   |
|:-------------:|:--------------------------------:|:-----:|:--------------------------------:|
| /find          | GET                              |   id  |不传 id 则查询全部,默认基于id的生序，参数传入sort=1或者asc代表生序，传入sort=-1或者sort=desc代表降序 |
| /add           | POST                             |name  id |id 与 name 都不可重复 |
| /del          | POST                              |  id     |不传id则什么都不删除,id=all则代表删除全部   |
| /update        | POST                              | id   | 修改id对应的name        |
