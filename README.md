# Pokemon Great Project
This project is builded using Django and React.

## Backend Getting Start
```bash
py -m venv venv
source venv/Scripts/activate
pip install -r ../requirements.txt 
```

## Deployment
```bash
docker save backend-django | gzip > backend.tar.gz
docker save frontend-react | gzip > frontend.tar.gz

scp ./backend.tar.gz ${remote}:/home/ubuntu/images/
scp ./frontend.tar.gz ${remote}:/home/ubuntu/images/
scp ../docker-compose.yml  ${remote}:/home/ubuntu/images/

docker load < backend.tar.gz
docker load < frontend.tar.gz
```
