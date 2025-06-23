# Etapa 1: build de Angular
FROM node:20 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

# Etapa 2: Nginx para servir los archivos
