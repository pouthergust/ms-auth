-- Criando Extensão para uuid v4
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Criando Extensão para criptografia
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,

    PRIMARY KEY (uuid)
)

INSERT INTO application_user (username, password)
-- Senha criptografada
VALUES ('admin', crypt('admin', 'my-salt'))
