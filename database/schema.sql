-- Orders & Products database schema
-- This file can be opened in MySQL Workbench.

CREATE DATABASE IF NOT EXISTS orders_products_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE orders_products_db;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(191) NOT NULL,
  name VARCHAR(191) NULL,
  password_hash VARCHAR(191) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY users_email_key (email)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(191) NOT NULL,
  date DATETIME(3) NOT NULL,
  description VARCHAR(191) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL,

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL AUTO_INCREMENT,
  serial_number VARCHAR(191) NOT NULL,
  is_new BOOLEAN NOT NULL DEFAULT true,
  photo VARCHAR(191) NULL,
  title VARCHAR(191) NOT NULL,
  type VARCHAR(191) NOT NULL,
  specification VARCHAR(191) NOT NULL,
  guarantee_start DATETIME(3) NOT NULL,
  guarantee_end DATETIME(3) NOT NULL,
  date DATETIME(3) NOT NULL,
  order_id INT NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL,

  PRIMARY KEY (id),
  INDEX products_order_id_idx (order_id),
  CONSTRAINT products_order_id_fkey
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS prices (
  id INT NOT NULL AUTO_INCREMENT,
  value DECIMAL(10, 2) NOT NULL,
  symbol VARCHAR(191) NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  product_id INT NOT NULL,

  PRIMARY KEY (id),
  INDEX prices_product_id_idx (product_id),
  CONSTRAINT prices_product_id_fkey
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
