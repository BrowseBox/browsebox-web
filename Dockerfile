FROM mysql/mysql-server:latest

ENV MYSQL_DATABASE=DB\
    MYSQL_ROOT_PASSWORD=password \
    MYSQL_ROOT_HOST=%

ADD ./browsebox-backend/database/browsebox.sql /docker-entrypoint-initdb.d/
ADD ./browsebox-backend/database/review_score_trigger.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
