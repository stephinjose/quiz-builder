CREATE TABLE [dbo].[Questions] (
    [Id]           INT            IDENTITY (1, 1) NOT NULL,
    [QuizId]       INT            NOT NULL,
    [SortOrder]    INT            NOT NULL,
    [Question]     NVARCHAR (MAX) NOT NULL,
    [QuestionType] NCHAR (1)      NOT NULL,
    CONSTRAINT [PK_Questions] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Questions_Questions] FOREIGN KEY ([QuestionType]) REFERENCES [dbo].[QuestionTypes] ([Symbol]),
    CONSTRAINT [FK_Questions_Quizzes] FOREIGN KEY ([QuizId]) REFERENCES [dbo].[Quizzes] ([Id]),
    CONSTRAINT [UQ_Questions_QuizId_SortOrder] UNIQUE NONCLUSTERED ([QuizId] ASC, [SortOrder] ASC)
);



