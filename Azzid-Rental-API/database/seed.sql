USE azzid_rentcar;

INSERT INTO vehicles (id, name, brand, model, category, year, plate_number, transmission, seats, fuel, price_lepas_kunci, price_dengan_driver, features)
VALUES ('avanza', 'Toyota Avanza', 'Toyota', 'Avanza', 'MPV', 2023, 'B 1234 AZD', 'Automatic', 7, 'Bensin', 350000, 550000, '["AC", "USB", "Bluetooth"]');

INSERT INTO customers (id, name, whatsapp, email, address)
VALUES ('CST-001', 'Customer Demo', '081234567890', 'demo@example.com', 'Jakarta');
