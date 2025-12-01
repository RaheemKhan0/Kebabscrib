# ---- development ----
FROM node:20-bullseye-slim AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
EXPOSE 3000
CMD ["npm", "run" , "dev"]




