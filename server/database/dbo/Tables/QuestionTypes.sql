﻿CREATE TABLE [dbo].[QuestionTypes] (
    [Symbol] NCHAR (1)  NOT NULL,
    [Type]   NCHAR (10) NOT NULL,
    CONSTRAINT [UQ_QuestionType] UNIQUE CLUSTERED ([Symbol] ASC)
);
