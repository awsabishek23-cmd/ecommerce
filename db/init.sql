create database ecommerce;

use ecommerce;

create table users(
    user_id int primary key auto_increment,
    user_name varchar(100) not null,
    user_email varchar(100) not null,
    user_password varchar(100) not null,
    user_delivery_address varchar(250) not null
)

-- mysql -h database-1.***.us-east-1.rds.amazonaws.com -P 3306 -u admin -p < init.sql
