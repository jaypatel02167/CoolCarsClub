
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS RSVPEvents;
DROP TABLE IF EXISTS HostedEvents;
DROP TABLE IF EXISTS Rating;

CREATE TABLE Events(
    EventID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title varchar(100),
    EventDescription varchar(255),
    rating REAL,
    Host varchar(255),
    Location varchar(255),
    EventDate DATE,
    EventTime TIME
);
INSERT INTO Events (EventID, Title, EventDescription, rating, Host, Location, EventDate, EventTime)

VALUES (1, "Exotic Meets", "Car Meet for exotic cars", 5.0, "CLT Meets", "Uptown Charlotte", "2020-12-30", "11:00 PM");


INSERT INTO Events (EventID, Title, EventDescription, rating, Host, Location, EventDate, EventTime)
VALUES (2, "Muscle Meets", "Car meet for muscle cars", 4.0, "Savage Garage", "UNC Charlotte", "2020-12-21", "09:00 AM");

INSERT INTO Events (EventID, Title, EventDescription, rating, Host, Location, EventDate, EventTime)
VALUES (3, "NASCAR Meets", "Car Meet for NASCAR cars", 5.0, "NASCAR", "NASCAR Track", "2021-01-01", "09:00 AM");

INSERT INTO Events (EventID, Title, EventDescription, rating, Host, Location, EventDate, EventTime)
VALUES (4, "Cars and Coffee", "Cars and Coffee", 3.0, "Cars and Coffee", "Concord Milsl Mall", "2021-01-01", "09:00 AM");

INSERT INTO Events (EventID, Title, EventDescription, rating, Host, Location, EventDate, EventTime)
VALUES (5, "Test Event", "Test Event", 5.0, "CLT Meets", "Uptown Charlotte", "2020-12-30", "11:00 PM");


CREATE TABLE User(
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName varchar(255),
    LastName varchar(255),
    Email varchar(255),
    Username varchar(255),
    Password varchar(255),
    Car varchar(255),
    RSVPEvents int,
    HostedEvents int,
    FOREIGN KEY (RSVPEvents) REFERENCES events (EventID),
    FOREIGN KEY (HostedEvents) REFERENCES events (EventID)
);

INSERT INTO User (UserID, FirstName, LastName, Email, Username, Password, Car)
VALUES (1, "Jay", "Patel", "jpate118@uncc.edu", "jpate118", "P@ssw0rd", "Audi A4");


CREATE TABLE RSVPEvents(
    Username varchar(255),
    EventID INTEGER,
    RSVP varchar(10),
    FOREIGN KEY (Username) REFERENCES user (Username),
    FOREIGN KEY (EventID) REFERENCES events (EventID)
);

INSERT INTO RSVPEvents (Username, EventID, RSVP)
VALUES ("jpate118", 1, "Yes");

INSERT INTO RSVPEvents (Username, EventID, RSVP)
VALUES ("jpate118", 3, "Yes");

INSERT INTO RSVPEvents (Username, EventID, RSVP)
VALUES ("jpate118", 2, "Maybe");

CREATE TABLE HostedEvents(
    Username varchar(255),
    EventID INTEGER,
    FOREIGN KEY (Username) REFERENCES user (Username),
    FOREIGN KEY (EventID) REFERENCES events (EventID)
);

CREATE TABLE Rating(
    EventID INTEGER,
    Rating REAL,
    FOREIGN KEY (EventID) REFERENCES events (EventID)
);