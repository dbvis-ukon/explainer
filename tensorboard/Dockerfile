FROM l.gcr.io/google/bazel:0.22.0
MAINTAINER thilo.spinner@uni-konstanz.de
ENTRYPOINT ["/bin/sh", "-c"]


########################
# Install Dependencies #
########################

# Install OS requirements
# See: https://github.com/phusion/baseimage-docker/issues/319
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  apt-utils
RUN apt-get install -y \
  python-pip

# Copy requirements.txt to container
COPY requirements.txt /tmp/requirements.txt

# Install Python requirements
RUN pip install -r /tmp/requirements.txt

# Cleanup
RUN rm /tmp/requirements.txt


##################
# Set Parameters #
##################

# Set .bazelrc parameters
RUN echo "build --incompatible_remove_native_http_archive=false" > /root/.bazelrc


############
# Copy App #
############

# Copy app to container
COPY ./app /src/workspace

# Check content of app folder
RUN ls -la /src/workspace


########################
# Workdir & Entrypoint #
########################

# Set workdir to app
WORKDIR /src/workspace
ENTRYPOINT ["bazel"]