USE [TodoApp]
GO
/****** Object:  Table [dbo].[Todos]    Script Date: 2021. 09. 12. 20:32:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Todos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Deadline] [datetime2](7) NULL,
	[Priority] [int] NOT NULL,
	[Status] [int] NOT NULL,
	[Deleted] [bit] NOT NULL,
 CONSTRAINT [PK_Todos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Todos]  WITH CHECK ADD  CONSTRAINT [FK_Todos_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Todos] CHECK CONSTRAINT [FK_Todos_AspNetUsers_UserId]
GO
