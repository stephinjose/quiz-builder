CREATE TABLE [dbo].[QuestionTypes] (
    [Symbol] CHAR (1)   NOT NULL,
    [Type]   NCHAR (10) NOT NULL,
    CONSTRAINT [UQ_QuestionType] UNIQUE CLUSTERED ([Symbol] ASC)
);





