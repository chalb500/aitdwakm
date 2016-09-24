# use our prepared Raspberry Pi compatible Docker base image with Node.js
FROM hypriot/rpi-node:latest

# make the src folder available in the docker image
ADD . /src
WORKDIR /src

# install the dependencies from the package.json file
RUN npm install

# make port 80 available outside of the image
EXPOSE 80

# start node with the app.js file of the application
CMD ["node", "app.js"]
