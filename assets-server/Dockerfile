FROM python:3.7
MAINTAINER thilo.spinner@uni-konstanz.de


############
# Copy App #
############

# Copy app and assets to container
COPY ./app /usr/src/app
COPY ./serve /serve

# Check content of app and serve folder
RUN ls -la /usr/src/app
RUN ls -la /serve


###########
# Workdir #
###########

# Set workdir to app
WORKDIR /usr/src/app
