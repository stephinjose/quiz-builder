CREATE PROCEDURE sp_Quiz_Create
(
	@Auth0Id NVARCHAR(200),
	@Email NVARCHAR(200),
	@QuizTitle NVARCHAR(500),
	@Permalink NVARCHAR(6),
	@Questions udt_New_Quiz_Questions READONLY
)
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY
		
		DECLARE @UserId INT;
		IF NOT EXISTS(SELECT 1 FROM Users WHERE Auth0Id = @Auth0Id)
			BEGIN
				INSERT INTO Users(Auth0Id, Email)
				VALUES(@Auth0Id, @Email);
				SET @UserId = SCOPE_IDENTITY();
			END
		ELSE
			BEGIN
				SET @UserId = (SELECT Id FROM Users WHERE Auth0Id = @Auth0Id)
			END

		DECLARE @QuizId INT;
		INSERT INTO Quizzes(Title, UserId, Permalink)
		VALUES(@QuizTitle, @UserId, @Permalink);
		SET @QuizId = SCOPE_IDENTITY();

		INSERT INTO Questions(QuizId, SortOrder, QuestionType, Question)
		SELECT DISTINCT @QuizId, QuestionSortOrder, QuestionType, QuestionText FROM @Questions;

		INSERT INTO Answers(QuestionId, SortOrder, [Text], IsCorrect)
		SELECT QT.Id, QP.AnswerSortOrder, QP.AnswerText, QP.IsCorrect FROM Questions QT 
		INNER JOIN @Questions QP ON QT.SortOrder = QP.QuestionSortOrder
		WHERE QT.QuizId = @QuizId

	COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		DECLARE @error int,
            @message varchar(4000);

		SELECT
		  @error = ERROR_NUMBER(),
		  @message = ERROR_MESSAGE();
		
		ROLLBACK TRANSACTION;
		
		RAISERROR ('sp_Quiz_Create: %d: %s', 16, 1, @error, @message);
	END CATCH;

END