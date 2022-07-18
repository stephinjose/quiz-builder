IF NOT EXISTS (SELECT 1 FROM QuestionTypes WHERE Symbol = 'S')
	INSERT INTO QuestionTypes (Symbol, [Type])
	VALUES ('S', 'SINGLE')
GO

IF NOT EXISTS (SELECT 1 FROM QuestionTypes WHERE Symbol = 'M')
	INSERT INTO QuestionTypes (Symbol, [Type])
	VALUES ('M', 'MULTIPLE')
GO