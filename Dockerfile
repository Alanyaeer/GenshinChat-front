# 构建阶段
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
# # 3. 安装依赖（国内环境可加 --registry 配置 npm 镜像加速）
RUN npm config set registry https://registry.npmmirror.com
# # 安装pnpm
RUN npm install -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com

# 安装依赖
RUN pnpm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# 复制项目文件
COPY . .

# 构建项目
RUN pnpm run build --mode ${NODE_ENV}

# 部署阶段
FROM nginx:alpine

# 从构建阶段复制构建结果到nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义nginx配置（如果有）
# 若需自定义配置，可在项目根目录创建nginx.conf，取消下面一行注释
COPY ./docs/nginx/nginx-deploy.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]