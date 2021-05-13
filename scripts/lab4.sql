CREATE DATABASE class;
USE class;

CREATE TABLE students (
	sid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name CHAR(100),
    grade ENUM('A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F')
);

CREATE USER 'teacher1'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'iamteacher1';
GRANT ALL ON class.students TO 'teacher1'@'localhost';
