<Banner />
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

-m 是主分支的意思

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

##### pull 出错：

- 不能合并没有任何关联的历史记录

![20-git-pull-error](assets\20-git-pull-error.png)

- 解决：在最后添加命令：--allow-unraleted-histories

![21-pull-success](assets\21-pull-success.png)

- pull 的时候有可能造成文件冲突：都有 README.md 文件

![22-conflict](assets\22-conflict.png)

- 解决冲突：

  ![23-conflict-deal](assets\23-conflict-deal.png)

![放弃本地修改](C:\Users\24642\Desktop\git笔记\assets\放弃本地修改.png)
