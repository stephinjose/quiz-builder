CREATE TABLE [dbo].[Quizzes] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [UserId]    INT            NOT NULL,
    [Title]     NVARCHAR (500) NOT NULL,
    [CreatedOn] DATETIME       CONSTRAINT [DF_Quizzes_CreatedOn] DEFAULT (getutcdate()) NOT NULL,
    [Permalink] NCHAR (6)      NOT NULL,
    CONSTRAINT [PK_Quizzes] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Quizzes_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
);




GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Quizzes_Permalink]
    ON [dbo].[Quizzes]([Permalink] ASC);

