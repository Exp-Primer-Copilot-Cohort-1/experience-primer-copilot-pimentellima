#!/bin/bash

function git_pull {
    cd $1;
    git pull;
}

function install {
    cd $1;
    yarn install;
}

function start {
    cd $1;
    pm2 stop all;
    pm2 delete all;
    pm2 start ecosystem.config.js;
}

deploy() {
    git_pull $1;
    if [ $? -ne 0 ]; then
        echo "git pull failed";
        exit 1;
    fi

    install $1;
    if [ $? -ne 0 ]; then
        echo "yarn install failed";
        exit 1;
    fi

    start $1;
    if [ $? -ne 0 ]; then
        echo "pm2 start failed";
        exit 1;
    fi
}

deploy $1;
