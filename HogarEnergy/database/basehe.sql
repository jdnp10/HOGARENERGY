USE defaultdb;
CREATE DATABASE hogarenergy;
USE hogarenergy;
CREATE TABLE anunciantes(

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    empresa VARCHAR(100) NOT NULL,

    celular VARCHAR(20) NOT NULL,

    correo VARCHAR(120) NOT NULL,

    plan VARCHAR(20) NOT NULL,

    valor DECIMAL(10,2) NOT NULL,

    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    estado VARCHAR(20) DEFAULT 'Pendiente'

);
CREATE TABLE espacios_publicitarios(

    id INT AUTO_INCREMENT PRIMARY KEY,

    numero_espacio INT NOT NULL,

    disponible BOOLEAN DEFAULT TRUE,

    anunciante_id INT,

    FOREIGN KEY (anunciante_id)
    REFERENCES anunciantes(id)

);
INSERT INTO espacios_publicitarios
(numero_espacio)

VALUES
(1),(2),(3),(4),(5),
(6),(7),(8),(9),(10);
SHOW DATABASES;
USE hogarenergy;

SHOW TABLES;
