FROM python:3.10-slim


# setting work directory
WORKDIR /usr/src/app


# env variables
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWEITEBYTECODE 1


# install psycopg dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  libpq-dev \
  && rm -rf /var/lib/apt/lists/*


# install dependencies
RUN pip install --upgrade pip pipenv flake8
COPY requirements.txt ./
# RUN pipenv install --system --ignore-pipfile
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt


COPY . .


# lint
# RUN flake8 --ignore=E501,F401 .
