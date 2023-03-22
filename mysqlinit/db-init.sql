CREATE DATABASE IF NOT EXISTS `laradock`;

CREATE USER 'laradock'@'laradock' IDENTIFIED BY 'secret';

GRANT ALL PRIVILEGES ON *.* TO 'laradock'@'laradock' WITH GRANT OPTION;

GRANT ALL ON `laradock`.* TO 'laradock'@'laradock';

