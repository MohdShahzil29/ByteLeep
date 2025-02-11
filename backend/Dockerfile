# Use official Node.js image as the base
FROM node:20.17.0

# Set working directory inside container
WORKDIR /app

# Install system dependencies for various languages
RUN apt-get update && apt-get install -y build-essential default-jdk python3 python3-pip php-cli golang-go wget unzip libicu-dev && rm -rf /var/lib/apt/lists/*

# Install Rust using rustup (non-interactive mode)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Add Rust binaries to PATH
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Swift (example: Swift 5.7 for Ubuntu 20.04)
RUN wget https://swift.org/builds/swift-5.7-release/ubuntu2004/swift-5.7-RELEASE/swift-5.7-RELEASE-ubuntu20.04.tar.gz && \
    tar -xzf swift-5.7-RELEASE-ubuntu20.04.tar.gz && \
    mv swift-5.7-RELEASE-ubuntu20.04 /opt/swift && \
    rm swift-5.7-RELEASE-ubuntu20.04.tar.gz
# Add Swift binaries to PATH
ENV PATH="/opt/swift/usr/bin:${PATH}"

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json . 

# Install Node.js dependencies and rebuild bcrypt (to compile natively for Linux)
RUN npm install --force && npm rebuild bcrypt --build-from-source

# Copy the rest of the project files
COPY . .  

# Expose the port on which your Node.js app listens
EXPOSE 5000  

# Start the server using nodemon
CMD ["npx", "nodemon", "server.js"]
