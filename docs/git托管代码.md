---
title: git托管代码
date: 2019-09-03 14:06:57
categories: git的使用
---



把远程仓库初始化之后，需要先迁移到本地

需要使用一个命令

```tex
git clone 项目地址
例如
git clone https://gitee.com/ligoudan2019/LiGouDanHeCuiHuaBuDeBuShuoDeGuShi.git
```

在把自己的代码提交到远程仓库之前，需要先把变化的代码先暂存

1.先把变化添加

```
git add .
```

代表把所有的变化进行暂存

2.把提交的备注先写一下

```
git commit -m '备注信息'
```

-m是主分支的意思

上面两步仅仅是在本地进行提交了，还要一个操作才能把项目提交到远程仓库

但是在提交到远程仓库之前，考虑到有团队协作的需求，需要先把自己的代码更新

```
git pull
```

目前大家其实都是个人操作，一般是不会出现问题，

如果是将来出现问题之后，会进行处理之后才提交

在把你自己的代码提交到远程仓库

```
git push
```



#### 常见错误

##### pull出错：

- 不能合并没有任何关联的历史记录

- 解决：在最后添加命令：--allow-unraleted-histories



- pull的时候有可能造成文件冲突：都有README.md文件

- 解决冲突：

  使用vscode打开
  
  ![1567492754217](https://s2.ax1x.com/2019/09/03/nkA5vT.png)



##### 放弃更改

![放弃本地修改](https://s2.ax1x.com/2019/09/03/nkAqa9.png)





