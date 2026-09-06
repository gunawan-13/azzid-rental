DROP DATABASE IF EXISTS azzid_rentcar;
CREATE DATABASE azzid_rentcar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE azzid_rentcar;

CREATE TABLE vehicles (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50),
  category ENUM('City Car', 'MPV', 'SUV', 'Premium', 'Commercial') NOT NULL,
  year INT NOT NULL,
  plate_number VARCHAR(20) NOT NULL,
  transmission ENUM('Automatic', 'Manual') NOT NULL,
  seats INT NOT NULL,
  fuel ENUM('Bensin', 'Diesel', 'Hybrid', 'Listrik') NOT NULL,
  color VARCHAR(50),
  doors INT DEFAULT 5,
  baggage VARCHAR(50),
  price_lepas_kunci DECIMAL(15, 0) NOT NULL,
  price_dengan_driver DECIMAL(15, 0) NOT NULL,
  status ENUM('available', 'rented', 'maintenance', 'inactive') DEFAULT 'available',
  image_url TEXT,
  description TEXT,
  features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE customers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  address TEXT,
  total_bookings INT DEFAULT 0,
  total_spending DECIMAL(15, 0) DEFAULT 0,
  last_rental VARCHAR(100),
  status ENUM('New', 'Regular', 'VIP') DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rentals (
  id VARCHAR(50) PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL,
  vehicle_id VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  rental_type ENUM('Lepas Kunci', 'Dengan Driver') NOT NULL,
  pickup_location VARCHAR(255),
  dropoff_location VARCHAR(255),
  driver_id VARCHAR(50) NULL,
  subtotal DECIMAL(15, 0) NOT NULL,
  driver_cost DECIMAL(15, 0) DEFAULT 0,
  discount DECIMAL(15, 0) DEFAULT 0,
  total DECIMAL(15, 0) NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Ongoing', 'Completed', 'Cancelled', 'Expired') DEFAULT 'Pending',
  payment_method ENUM('QRIS', 'VA BCA', 'VA Mandiri', 'GoPay', 'OVO', 'Transfer Bank', 'Manual / Kantor'),
  payment_status ENUM('UNPAID', 'PENDING', 'PAID', 'REFUNDED') DEFAULT 'UNPAID',
  transaction_id VARCHAR(100),
  paid_at TIMESTAMP NULL,
  user_email VARCHAR(100) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rentals_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  CONSTRAINT fk_rentals_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE RESTRICT,
  INDEX idx_rentals_status (status),
  INDEX idx_rentals_dates (start_date, end_date)
);
