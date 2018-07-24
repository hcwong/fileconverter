FROM node:alpine

# create app directory
RUN mkdir -p /fileconverter
WORKDIR /fileconverter

# copy stuff into the directory
COPY . ./ 

# Download ffmpeg.
RUN apk add --no-cache ffmpeg

# install local dependencies
RUN npm config set unsafe-perm true && npm install
RUN npm install -g typescript

# expose port
EXPOSE 5000

CMD ["npm", "start"]