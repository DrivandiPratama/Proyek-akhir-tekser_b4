# Gunakan Node.js 18 Alpine
FROM node:18-alpine

# Set folder kerja di dalam container
WORKDIR /app

# Copy package.json dulu supaya build lebih cepat
COPY package*.json ./

# Install library (dependencies)
RUN npm install --production

# Copy semua file dari laptop ke dalam container
COPY . .

# Beritahu Docker aplikasi jalan di port 3000
EXPOSE 3000

# Jalankan aplikasi (Memanggil app.js, bukan app/index.js)
CMD ["node", "app.js"]