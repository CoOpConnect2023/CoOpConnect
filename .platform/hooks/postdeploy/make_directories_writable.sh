#!/bin/sh

# Laravel requires some directories to be writable.

sudo chmod -R 777 storage/
sudo chmod -R 777 bootstrap/cache/

# Ensure profile_images directory is writable
sudo mkdir -p storage/app/public/profile_images
sudo chmod -R 777 storage/app/public/profile_images
