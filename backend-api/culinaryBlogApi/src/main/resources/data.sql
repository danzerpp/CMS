INSERT INTO roles (id, name) VALUES (1, 'ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO roles (id, name) VALUES (2, 'CHEF') ON CONFLICT DO NOTHING;;
INSERT INTO users (id, role_id, email, fullName, password, is_deleted) VALUES (1, 1, 'kacper@kacper.pl', 'Kacper Cichosz', '$2a$10$orkAidb.4nZLKWadbPuW1.I.DaFmVzgbjeJ6ex9sCehh/W1HlKriG', 0) ON CONFLICT DO NOTHING;
INSERT INTO users (id, role_id, email, fullName, password, is_deleted) VALUES (2, 1, 'dominik@dominik.pl', 'Dominik Dziabias', '$2a$10$fE5o7.sUCa2NChK68mLQ/ePoiX0TN.UrAXkl6Dg5INhJtTc0c6q.W', 0) ON CONFLICT DO NOTHING;
INSERT INTO users (id, role_id, email, fullName, password, is_deleted) VALUES (3, 2, 'kacper2@kacper.pl', 'Kacper Cichosz', '$2a$10$orkAidb.4nZLKWadbPuW1.I.DaFmVzgbjeJ6ex9sCehh/W1HlKriG', 0) ON CONFLICT DO NOTHING;
INSERT INTO users (id, role_id, email, fullName, password, is_deleted) VALUES (4, 2, 'dominik2@dominik.pl', 'Dominik Dziabias', '$2a$10$fE5o7.sUCa2NChK68mLQ/ePoiX0TN.UrAXkl6Dg5INhJtTc0c6q.W', 0) ON CONFLICT DO NOTHING;

INSERT INTO products (id, name) VALUES (1, 'mleko') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (2, 'mąka') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (3, 'woda') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (4, 'drożdże') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (5, 'sól') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (6, 'cukier') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (7, 'makaron') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (8, 'olej') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (9, 'pieprz') ON CONFLICT DO NOTHING;
INSERT INTO products (id, name) VALUES (10, 'masło') ON CONFLICT DO NOTHING;

INSERT INTO units (id, name) VALUES (1, 'gramy') ON CONFLICT DO NOTHING;
INSERT INTO units (id, name) VALUES (2, 'kilogramy') ON CONFLICT DO NOTHING;
INSERT INTO units (id, name) VALUES (3, 'miligramy') ON CONFLICT DO NOTHING;
INSERT INTO units (id, name) VALUES (4, 'mililitry') ON CONFLICT DO NOTHING;
INSERT INTO units (id, name) VALUES (5, 'litry') ON CONFLICT DO NOTHING;
INSERT INTO units (id, name) VALUES (6, 'dekagramy') ON CONFLICT DO NOTHING;

INSERT INTO categories (id, name, ordinal_no, created_by, created_date, is_visible) VALUES (1, 'kuchnia włoska', 1, 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO categories (id, name, ordinal_no, created_by, created_date, is_visible) VALUES (2, 'kuchnia polska', 2, 1, NOW(), 1) ON CONFLICT DO NOTHING;

