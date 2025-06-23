# Etapa 1: Build de Angular
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

# Etapa 2: Servidor Nginx para los archivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist/front-extra /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
