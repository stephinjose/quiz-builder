CREATE TABLE [dbo].[Users] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Auth0Id]   NVARCHAR (200) NOT NULL,
    [Email]     NVARCHAR (200) NOT NULL,
    [CreatedOn] DATETIME       CONSTRAINT [DF_Users_CreatedOn] DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);

