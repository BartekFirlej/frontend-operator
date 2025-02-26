# Stage 1: Build the React app
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Copy the production build from the previous stage
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 to the outside world
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
