CREATE TABLE [dbo].[Users] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Auth0Id]   NVARCHAR (200) NOT NULL,
    [Email]     NVARCHAR (200) NOT NULL,
    [CreatedOn] DATETIME       CONSTRAINT [DF_Users_CreatedOn] DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [UQ_Users_Email] UNIQUE NONCLUSTERED ([Email] ASC)
);




GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Auth0Id]
    ON [dbo].[Users]([Auth0Id] ASC);

