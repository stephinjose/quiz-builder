CREATE TABLE [dbo].[Answers] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [QuestionId] INT            NOT NULL,
    [SortOrder]  INT            NOT NULL,
    [Text]       NVARCHAR (MAX) NOT NULL,
    [IsCorrect]  BIT            NOT NULL,
    CONSTRAINT [PK_Answers] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Answers_Questions] FOREIGN KEY ([QuestionId]) REFERENCES [dbo].[Questions] ([Id]),
    CONSTRAINT [UQ_Answers_QuestionId_SortOrder] UNIQUE NONCLUSTERED ([QuestionId] ASC, [SortOrder] ASC)
);



