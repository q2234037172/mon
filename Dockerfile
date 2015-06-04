FROM node
MAINTAINER SHANG xinshangshangxin@gmail.com
# Build app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN cd sites \
	&& npm install --production

EXPOSE 1340

CMD [ "node","sites/app.js"]
