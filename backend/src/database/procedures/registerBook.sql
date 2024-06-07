CREATE OR ALTER PROCEDURE registerBook(
    @id VARCHAR(255),
    @title VARCHAR(255),
    @content VARCHAR(255),
    @createdAt VARCHAR(255)
)
AS
BEGIN
    INSERT INTO books(id, title, content, createdAt) 
    VALUES(@id, @title, @content, @createdAt)
END