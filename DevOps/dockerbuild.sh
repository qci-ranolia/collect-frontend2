#!/bin/bash
TIMESTAMP=`TZ=IST-5:30 date +%F-%H%M`
GITHUB_LINK="https://github.com/Shwshank/QCI-Collect-frontend.git"
DOCKERNAME="Collect-Frontend"
IMAGENAME="qci-collect-front"
REPONAME="QCI-Collect-frontend"

git clone $GITHUB_LINK
mv dist/ /home/ubuntu/dist_backups/collect/dist_$TIMESTAMP
mv $REPONAME/dist/ .
rm -rf $REPONAME
docker stop $DOCKERNAME
docker rm $DOCKERNAME
docker rmi $IMAGENAME
docker build -t $IMAGENAME .
docker run -dt --name $DOCKERNAME $IMAGENAME