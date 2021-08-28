\c my_db

create table tasks (
  id serial PRIMARY KEY,
  title varchar(100) not null,
  completed boolean default false
);