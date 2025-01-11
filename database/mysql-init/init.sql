
/*
Exemplo de como criar as tabelas no mysql com docker
*/

-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS HeroesPlataform;

-- Usar o banco de dados
USE HeroesPlataform;

-- Criar a tabela "studios"
CREATE TABLE IF NOT EXISTS studios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nationality VARCHAR(50),
    history TEXT
);

-- Criar a tabela "team"
CREATE TABLE IF NOT EXISTS team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    creator VARCHAR(50)
);

-- Criar a tabela "heroes"
CREATE TABLE IF NOT EXISTS heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    studio_id INT NOT NULL,
    power_type VARCHAR(50),
    morality VARCHAR(50),
    first_appearance VARCHAR(255),
    release_date DATE,
    creator VARCHAR(50),
    weak_point VARCHAR(100),
    affiliation VARCHAR(100),
    story VARCHAR(255),
    team_id INT,
    genre VARCHAR(50),
    image1 BLOB,
    image2 BLOB,
    FOREIGN KEY (studio_id) REFERENCES studios(id),
    FOREIGN KEY (team_id) REFERENCES team(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    birthdate DATE,
    firstemail VARCHAR(100) NOT NULL,
    secondemail VARCHAR(100),
    logradouro VARCHAR(100),
    address VARCHAR(100),
    complement VARCHAR(100),
    cep VARCHAR(9),
    state VARCHAR(50),
    city VARCHAR(100)
);