DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS restaurants_menus;

CREATE TABLE restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  location TEXT NOT NULL
);

CREATE TABLE menus (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE restaurants_menus (
  restaurants_id BIGINT REFERENCES restaurants(id),
  menus_id BIGINT REFERENCES menus(id),
  PRIMARY KEY(restaurants_id, menus_id)
);
