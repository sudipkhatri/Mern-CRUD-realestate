#select node js environment
FROM node

#sets the working directory which is server
WORKDIR /server

#copy package 
COPY package.json .

#run npm install to install all packages
RUN npm i

#copy entire source code into server directory or can be written as COPY . /server
COPY . .

#port numnber that server will be running on
EXPOSE 5001

#command to run server.js
CMD ["node", "server.js"]
