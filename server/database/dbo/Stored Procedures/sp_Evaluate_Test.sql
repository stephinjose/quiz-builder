CREATE PROCEDURE sp_Evaluate_Test
(
	@AnswerSheet dbo.udt_AnswerSheet READONLY,
	@QuizId INT
)
AS
BEGIN

	DECLARE @TotalQuestionCount INT, @WrongAnswersCount INT;
	
	SET @TotalQuestionCount = (SELECT COUNT(DISTINCT Qs.Id) FROM Questions Qs WHERE QuizId = @QuizId);

	SET @WrongAnswersCount = (SELECT COUNT(DISTINCT Qs.Id) FROM Questions Qs 
	INNER JOIN Answers An ON Qs.Id = An.QuestionId
	LEFT JOIN @AnswerSheet Ans ON An.Id = Ans.AnswerId AND Ans.MarkedCorrect = An.IsCorrect
	WHERE Qs.QuizId = @QuizId AND Ans.AnswerId IS NULL)

	SELECT @TotalQuestionCount - @WrongAnswersCount AS RightAnswersCount, @TotalQuestionCount TotalQuestionCount

END