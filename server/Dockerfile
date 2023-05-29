FROM python:3.11

WORKDIR /app

ENV FLASK_DEBUG=1

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt 

COPY . .

CMD [ "python3", "wsgi.py" ]