# chat-front

## 后端程序

[chat-backend 后端](https://github.com/Alanyaeer/GenshinChat-server)

## 前端程序

[chat-front 前端](https://github.com/Alanyaeer/GenshinChat-front)

### Development（开发环境）

```
cd docs
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

cd docs
docker-compose -f docker-compose-deploy.yml up -d
# 然后就可以愉快的访问啦， 本地输入localhost 
```

## 技术栈

> websocket springboot vue

## 启动方式🎢

### 前端

在vscode中 打开控制台输入下面的指令

`npm install`
