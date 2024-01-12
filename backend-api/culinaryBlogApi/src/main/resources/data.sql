INSERT INTO roles (name) VALUES ('ADMIN');
INSERT INTO roles (name) VALUES ('CHEF');
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

--INSERT INTO categories (id, name, ordinal_no, created_by, created_date, is_visible) VALUES (1, 'kuchnia włoska', 1, 1, NOW(), 1);

--INSERT INTO recipes (id, category_id, ordinal_no, title, description, calories, path_to_image, created_by_user_id, created_date, is_visible) VALUES(1, 1, 1, 'Przepis na makaron', 'Bardzo prosty przepis w 10 minut', 100, '', 1, NOW() ,1);
--INSERT INTO recipes (id, category_id, ordinal_no, title, description, calories, path_to_image, created_by_user_id, created_date, is_visible) VALUES(2, 1, 2, 'Przepis na zupe', 'Bardzo prosty przepis na zupe w 10 minut', 100, '', 3, NOW() ,1);

--INSERT INTO ingredients (id, recipe_id, product_id, unit_id, quantity, ordinal_no) VALUES (1, 1, 1, 1, 10, 1);
