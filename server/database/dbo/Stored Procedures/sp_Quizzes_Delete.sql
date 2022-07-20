CREATE PROCEDURE sp_Quizzes_Delete
(
	@Auth0Id NVARCHAR(200),
	@quizId INT
)
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY
	
		DELETE A FROM Answers A 
		INNER JOIN Questions QST ON A.QuestionId = QST.Id
		INNER JOIN Quizzes QZ ON QST.QuizId = QZ.Id
		INNER JOIN Users U ON QZ.UserId = U.Id
		WHERE U.Auth0Id = @Auth0Id AND QZ.Id = @quizId

		DELETE QST FROM Questions QST 
		INNER JOIN Quizzes QZ ON QST.QuizId = QZ.Id
		INNER JOIN Users U ON QZ.UserId = U.Id
		WHERE U.Auth0Id = @Auth0Id AND QZ.Id = @quizId

		DELETE QZ FROM Quizzes QZ
		INNER JOIN Users U ON QZ.UserId = U.Id
		WHERE U.Auth0Id = @Auth0Id AND QZ.Id = @quizId

	COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		DECLARE @error int,
            @message varchar(4000);

		SELECT
		  @error = ERROR_NUMBER(),
		  @message = ERROR_MESSAGE();
		
		ROLLBACK TRANSACTION;
		
		RAISERROR ('sp_Quizzes_Delete: %d: %s', 16, 1, @error, @message);
	END CATCH;
END