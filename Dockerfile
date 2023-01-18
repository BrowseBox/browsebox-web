FROM mysql/mysql-server:8.0.32

ENV MYSQL_DATABASE=browsebox\
    MYSQL_ROOT_PASSWORD=password \
    MYSQL_ROOT_HOST=%

# Run SQL scripts
ADD ./browsebox-backend/database/browsebox.sql /docker-entrypoint-initdb.d/
ADD ./browsebox-backend/database/review_score_trigger.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
