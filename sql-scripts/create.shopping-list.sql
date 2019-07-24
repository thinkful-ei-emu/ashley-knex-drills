CREATE TABLE IF NOT EXISTS shopping_list (
    list__id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price decimal(12,2) NOT NULL,
    date_added TIMESTAMP DEFAULT now() NOT NULL,
    checked BOOLEAN DEFAULT false,
    category grocery NOT NULL
);

DROP TYPE IF EXISTS grocery;
CREATE TYPE grocery AS ENUM (
    'Main',
    'Snack',
    'Lunch',
    'Breakfast'
);

