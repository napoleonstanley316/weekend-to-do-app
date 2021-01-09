CREATE TABLE dailyRoutine (
    "id" serial PRIMARY KEY,
    "day" VARCHAR(10),
    "task" VARCHAR (50),
    "time" INT NOT NULL,
    "comment" VARCHAR(150)
);
INSERT INTO dailyRoutine (day, task, time, comment)
VALUES ('Sunday', 'Meditate',  '5', 'Using the Headspace app today')