CREATE PROCEDURE sp_Quiz_Retrieve
(
	@permalink NCHAR(6)
)
AS
BEGIN

	SELECT QZ.Id, QZ.Title FROM Quizzes QZ WHERE Permalink = @permalink

	SELECT QS.Id, QS.Question [Text], QS.QuestionType [Type], QS.SortOrder FROM Quizzes QZ
	INNER JOIN Questions QS ON QZ.Id = QS.QuizId
	WHERE QZ.Permalink = @permalink

	SELECT ANS.Id, ANS.QuestionId, ANS.SortOrder, ANS.[Text] FROM Quizzes QZ
	INNER JOIN Questions QS ON QZ.Id = QS.QuizId
	INNER JOIN Answers ANS ON QS.Id = ANS.QuestionId
	WHERE QZ.Permalink = @permalink

END