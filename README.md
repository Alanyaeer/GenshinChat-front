# 🏟️ chat-front

## ✈️ 后端

[chat-backend 后端](https://github.com/Alanyaeer/GenshinChat-server)

## 🥳部署

### Development（开发环境）

```
cd docker
docker-compose -f docker-compose.yml up -d

# 如果你还没有安装过pnpm
npm install -g pnpm
pnpm install 
pnpm dev

# 然后就可以愉快的访问啦， 本地输入localhost即可
```

### Deploy（部署）

```
# 如果之前构建过
docker stop genshinchat-front
docker rmi -f docs-genshinchat-front

cd docker
docker-compose -f docker-compose-deploy.yml up -d
# 然后就可以愉快的访问啦， 本地输入localhost 
```

## 🎨 界面展示

### 登录页面

1. 状态1
   ![image-20231031092344666](https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202310310923225.png)

2. 状态2
   ![image-20231031092544549](https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202310310925886.png)

### 聊天界面

#### 总览

![image-20231031092620704](https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202310310926783.png)

#### 聊天窗口

![image-20231031092813181](https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202310310928238.png)

### 用户管理

#### 管理用户信息

![image-20231031092640828](https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202310310926910.png)

#### 添加用户

![image-20231031092714204](https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202310310927281.png)

#### 删除好友

![image-20231031092743592](https://cdn.jsdelivr.net/gh/Alanyaeer/ImgSummary@master/img/202310310927639.png)

---

## 🤝 贡献指南

欢迎提交 PR 或 Issue 来帮助完善项目！

---

## 📜 License

MIT License
欢迎 Star ⭐ & Fork 🍴 一起完善！

---
