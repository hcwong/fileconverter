FROM node:latest

# create app directory
RUN mkdir -p /fileconverter
WORKDIR /fileconverter

# copy stuff into the directory
COPY . ./ 

# install local dependencies
RUN npm install

RUN npm install -g typescript

# Install FFMPEG
RUN apt-get update && apt-get install -y ffmpeg

# expose port
EXPOSE 5000

CMD ["npm", "start"]