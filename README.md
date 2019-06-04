# "Principles and Practices of Software Development" Assignments

My solutions to the assignments for ["M1522.002400
Principles and Practices of Software Development"
course](https://github.com/snu-sf-class/swpp201901).

## HW1: Backend for Meeting Appointment Site with Django Rest Framework
- The [assignment specifications](https://github.com/snu-sf-class/swpp201901/issues/5) are given in the course repository.
- To run this code:
```bash
cd hw1
virtualenv env
source env/bin/activate
pip3 install django
pip3 install djangorestframework
pip3 install django-cors-headers

cd main
python3 manage.py makemigrations meetings
python3 manage.py migrate
python3 manage.py runserver
```
- To deactivate, enter `deactivate`.
- The site directory is as follows:
  - Meeting list: `http://localhost:8000/meetings/`
  - Details for individual meeting: `http://localhost:8000/meetings/<id>`, with `<id>` replaced by meeting ID
  - User list: `http://localhost:8000/users/`
  - Details for individual user: `http://localhost:8000/users/<id>`, with `<id>` replaced by user ID

## HW2: Frontend for Meeting Appointment Site with React, Redux, and Redux-Saga
- The [assignment specifications](https://github.com/snu-sf-class/swpp201901/issues/16) are given in the course repository.
- To run this code:
```bash
# Run backend
cd hw2/meetings_back/
virtualenv env
source env/bin/activate
pip3 install django
pip3 install djangorestframework
pip3 install django-cors-headers
cd main
python3 manage.py makemigrations meetings
python3 manage.py migrate
python3 manage.py runserver

# Run frontend
cd hw2/meetings_front/
npm install
npm start
```
- The frontend site can be accessed at `http://localhost:3000/`.
