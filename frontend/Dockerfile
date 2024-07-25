# Dockerfile for Frontend (Production)

# Stage 1: Build the app
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . ./
# COPY ./.env.prod /usr/src/.env
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the built files from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Default command to run nginx
CMD ["nginx", "-g", "daemon off;"]
