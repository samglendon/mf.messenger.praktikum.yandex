ссылка heroku: https://rglendon-sprint4.herokuapp.com

npm run lint выдает warnings, настроил так.

команды для Docker.
docker build -t sprint4 .
docker run --rm -p 5000:5000 -d sprint4
(detach)

docker port [CONTAINER]  - посмотреть все открытые порты

docker ps -a
docker stop -t 0 ed22

  
