# Etapa 1: Construcción de la app Angular
FROM node:20 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration=production

# Etapa 2: Imagen ligera de Nginx para servir la app
FROM nginx:alpine

# Copiamos los archivos generados al directorio público de Nginx
COPY --from=build /app/dist/browser /usr/share/nginx/html


# Reemplazamos la configuración por defecto de Nginx con la personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf
