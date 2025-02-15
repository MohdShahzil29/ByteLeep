# Use official Node.js image as the base
FROM node:20.17.0


WORKDIR /app


RUN apt-get update && apt-get install -y build-essential default-jdk python3 python3-pip php-cli golang-go wget unzip libicu-dev && rm -rf /var/lib/apt/lists/*


RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
# Add Rust binaries to PATH
ENV PATH="/root/.cargo/bin:${PATH}"

RUN wget https://swift.org/builds/swift-5.7-release/ubuntu2004/swift-5.7-RELEASE/swift-5.7-RELEASE-ubuntu20.04.tar.gz && \
    tar -xzf swift-5.7-RELEASE-ubuntu20.04.tar.gz && \
    mv swift-5.7-RELEASE-ubuntu20.04 /opt/swift && \
    rm swift-5.7-RELEASE-ubuntu20.04.tar.gz
# Add Swift binaries to PATH
ENV PATH="/opt/swift/usr/bin:${PATH}"

COPY package*.json . 

RUN npm install --force && npm rebuild bcrypt --build-from-source


COPY . .  

EXPOSE 5000  

# CMD ["npx", "nodemon", "server.js"]
CMD ["node", "server.js"]

