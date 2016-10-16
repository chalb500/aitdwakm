#!/bin/bash

HOST="pi@game"
DOCKERIMAGE="gameserverimage"
DOCKERCONTAINER="gameservercontainer"

#Delete the workspace folder on the game server
echo "Deleting the workspace folder on the game server."
ssh -T $HOST "find ~/ -maxdepth 1 -type d -name \"workspace\" -exec rm -r {} \;"

#Put the workspace folder back on the game box
echo "Re-creating the workspace folder on the game server."
ssh -T $HOST "mkdir workspace"

#Copy the source code from the build server to the game box
echo "Copying the source code from the Jenkins server to the game server."
scp -r /var/lib/jenkins/workspace/AITDWAKM/src $HOST:/home/pi/workspace/src
scp /var/lib/jenkins/workspace/AITDWAKM/Dockerfile $HOST:/home/pi/workspace
scp /var/lib/jenkins/workspace/AITDWAKM/package.json $HOST:/home/pi/workspace
scp /var/lib/jenkins/workspace/AITDWAKM/app.js $HOST:/home/pi/workspace

#Look for dependent game server containers and remove them
CONTAINERID=$(ssh -T $HOST "docker ps -a | grep \"$DOCKERCONTAINER\" | awk '{print \$1}'")
if [ -n "$CONTAINERID" ]
  then
    echo "Found the game server container. The container id is: $CONTAINERID"
    echo "Now, stopping the container."
    ssh -T $HOST "docker stop $CONTAINERID"
    echo "Now removing the game server container."
    ssh -T $HOST "docker rm $CONTAINERID"
  else
    echo "Did not find the game server container."
fi

#Remove the game server image
IMAGEID=$(ssh -T $HOST "docker images | grep \"$DOCKERIMAGE\" | awk '{print \$3}'")
if [ -n "$IMAGEID" ]
  then
    echo "Found game server image, the image id is: $IMAGEID"
    echo "Removing the game server image to re-build it."
    ssh -T $HOST "docker rmi $IMAGEID"
  else
    echo "Did not find an existing game server image."
fi

#Build the image
echo "Building the game server image."
ssh -T $HOST "cd workspace;docker build --tag $DOCKERIMAGE ."

#Run the game server image as a container in the background on port 80
echo "Running the game server image on port 80."
ssh -T $HOST "docker run -d -p 80:80 --name $DOCKERCONTAINER $DOCKERIMAGE"
