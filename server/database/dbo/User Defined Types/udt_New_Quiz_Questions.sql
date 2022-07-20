CREATE TYPE [dbo].[udt_New_Quiz_Questions] AS TABLE (
    [QuestionSortOrder] INT            NOT NULL,
    [QuestionText]      NVARCHAR (MAX) NOT NULL,
    [QuestionType]      NCHAR (1)      NOT NULL,
    [AnswerSortOrder]   INT            NOT NULL,
    [AnswerText]        NVARCHAR (MAX) NOT NULL,
    [IsCorrect]         BIT            NOT NULL);

