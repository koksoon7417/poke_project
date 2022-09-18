# new nginx
# nginx state for serving content
FROM nginx:alpine
# Copy static assets from builder stage
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]