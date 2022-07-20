CREATE PROCEDURE sp_Quizzes_GetAll
(
	@Auth0Id NVARCHAR(200)
)
AS
BEGIN
	SELECT Q.Id, Q.Title, Q.Permalink FROM Users U 
	INNER JOIN Quizzes Q ON U.Id = Q.UserId
	WHERE U.Auth0Id = @Auth0Id
	ORDER BY Q.Id DESC
END