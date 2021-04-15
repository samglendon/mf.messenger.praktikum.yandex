ссылка на pull request: https://github.com/samglendon/mf.messenger.praktikum.yandex/pull/5

ссылка на Netlify: https://quirky-leavitt-366093.netlify.app/
ссылка на макет: https://github.com/samglendon/mf.messenger.praktikum.yandex/tree/main/ui

ссылка heroku: https://rglendon-sprint4.herokuapp.com

npm run lint выдает warnings, настроил так.

команды для Docker.
docker build -t sprint4 .
docker run --rm -p 5000:5000 -d sprint4
(detach)

docker port [CONTAINER]  - посмотреть все открытые порты

docker ps -a
docker stop -t 0 ed22

docker rm $(docker ps -a -q -f status=exited)
docker rmi   
