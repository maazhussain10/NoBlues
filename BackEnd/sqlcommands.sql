CREATE DATABASE campusq;
USE campusq;

CREATE TABLE campus(
     campusId varchar(8),
     campusName varchar(100),
     campusType varchar(40),
     planType varchar(40),
     noOfPersons int,
     campusLogo varchar(1000),
     campusEmail varchar(40),
     campusPassword varchar(40),
     dateCreated datetime,
     primary key (campusId,campusEmail)
);

CREATE TABLE userAccount(
    userId varchar(40) primary key,
    firstName varchar(40),
    lastName varchar(15),
    dob varchar(15),
    username varchar(30),
    email varchar(200),
    password varchar(40),
    campusId varchar(80),
    dateCreated datetime
);

CREATE TABLE queries(
    userId varchar(40),
    campusId varchar(8),
    queryId varchar(40) primary key,
    query varchar(2000),
    hashtag varchar(200),
    anonymous boolean,
    dateCreated datetime,
    FOREIGN KEY (userId) REFERENCES userAccount (userId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE answers(
    userId varchar(40),
    campusId varchar(8),
    queryId varchar(40),
    answerId varchar(40),
    answers varchar(2500),
    anonymous boolean,
    dateCreated datetime,
    foreign key (queryId) references queries(queryId) on delete cascade on update cascade
);

CREATE TABLE likes(
    userId varchar(40),
    campusId varchar(8),
    queryId varchar(40),
    answerId varchar(40),
    queryLikes boolean,
    answerLikes boolean,
    anonymous boolean
);

CREATE TABLE chat(
    chatId varchar(40) primary key,
    sender varchar(50),
    reciever varchar(50),
    campusId varchar(8),
    message varchar(2500),
    hasSeen boolean,
    isAnonymous boolean,
    dateCreated datetime
);