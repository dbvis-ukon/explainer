FROM python:3.7
MAINTAINER thilo.spinner@uni-konstanz.de

########################
# Install Dependencies #
########################

# Copy requirements.txt to container
COPY requirements.txt /tmp/requirements.txt

# Upgrade pip and install Python requirements
RUN pip install --upgrade pip
RUN pip install -r /tmp/requirements.txt

# Cleanup
RUN rm /tmp/requirements.txt


############
# Copy App #
############

# Copy app to container
COPY ./app /usr/src/app

# Check content of app folder
RUN ls -la /usr/src/app


###########
# Workdir #
###########

# Set workdir to app
WORKDIR /usr/src/app
