INSERT INTO roles (name) VALUES ('ADMIN');
INSERT INTO roles (name) VALUES ('USER');
INSERT INTO users (role_id, email, fullName, password, is_deleted) VALUES (1, 'kacper@kacper.pl', 'Kacper Cichosz', '$2a$10$orkAidb.4nZLKWadbPuW1.I.DaFmVzgbjeJ6ex9sCehh/W1HlKriG', 0);
INSERT INTO users (role_id, email, fullName, password, is_deleted) VALUES (1, 'dominik@dominik.pl', 'Dominik Dziabias', '$2a$10$fE5o7.sUCa2NChK68mLQ/ePoiX0TN.UrAXkl6Dg5INhJtTc0c6q.W', 0);
INSERT INTO users (role_id, email, fullName, password, is_deleted) VALUES (2, 'kacper2@kacper.pl', 'Kacper Cichosz', '$2a$10$orkAidb.4nZLKWadbPuW1.I.DaFmVzgbjeJ6ex9sCehh/W1HlKriG', 0);
INSERT INTO users (role_id, email, fullName, password, is_deleted) VALUES (2, 'dominik2@dominik.pl', 'Dominik Dziabias', '$2a$10$fE5o7.sUCa2NChK68mLQ/ePoiX0TN.UrAXkl6Dg5INhJtTc0c6q.W', 0);

INSERT INTO products (id, name) VALUES (1, 'mleko');
INSERT INTO products (id, name) VALUES (2, 'mąka');
INSERT INTO products (id, name) VALUES (3, 'woda');
INSERT INTO products (id, name) VALUES (4, 'drożdże');
INSERT INTO products (id, name) VALUES (5, 'sól');
INSERT INTO products (id, name) VALUES (6, 'cukier');
INSERT INTO products (id, name) VALUES (7, 'makaron');
INSERT INTO products (id, name) VALUES (8, 'olej');
INSERT INTO products (id, name) VALUES (9, 'pieprz');
INSERT INTO products (id, name) VALUES (10, 'masło');

INSERT INTO units (id, name) VALUES (1, 'gramy');
INSERT INTO units (id, name) VALUES (2, 'kilogramy');
INSERT INTO units (id, name) VALUES (3, 'miligramy');
INSERT INTO units (id, name) VALUES (4, 'mililitry');
INSERT INTO units (id, name) VALUES (5, 'litry');
INSERT INTO units (id, name) VALUES (6, 'dekagramy');
