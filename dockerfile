# Description: Dockerfile for the API server of a simple web application
FROM node:latest

# Set the working directory in the container to /usr/app
WORKDIR /usr/app

# Copy package.json into the working directory
COPY package.json .
COPY tsconfig.json .

# Install the app dependencies
RUN npm install && npm cache clean --force

# Copy everything else (the app)
COPY src/. ./src/
COPY prisma/. ./prisma/

RUN npx prisma generate

ENV DATABASE_URI="postgres://wosapgai:iHI0UVmY3M0uM0X0QdKGA-CFsNBcBJat@cornelius.db.elephantsql.com/wosapgai"

#ENTRYPOINT [ "node" , "index.ts" ]

CMD ["npm", "start"]