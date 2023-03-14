#Reverse ATS

# Installation/Setup

```
git clone https://github.com/Caposto/reverse-ats.git
```

To run Docker:
```
docker-compose up
```

You may encounter: "Error response from daemon". To fix, you must add the specified folders to you Docker file sharing resources. This can be done by going into the Docker Console > Settings > Resources > File Sharing

Flask API: http://localhost:5000
React Frontend: http://localhost:3000

Manual Setup (Flask API):
```
virtualenv venv (creates virtual environment called 'venv') 
venv\Scripts\activate (Activates virtual environment in cmd)
pip install -r requirements.txt
```

Manual Setup (React Frontend) - first cd into frontend
```
npm install
```

You will have to start each of the services seperately.

In reverse-ats/server run
```python3 wsgi.py```

In reverse-ats/frontend run
```npm start```