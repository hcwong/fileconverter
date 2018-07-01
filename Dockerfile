FROM node:latest

# create app directory
RUN mkdir -p /fileconverter
WORKDIR /fileconverter

# copy stuff into the directory
COPY . ./

# install local dependencies
RUN npm install

# expose port
EXPOSE 5000

CMD ["npm", "start"]