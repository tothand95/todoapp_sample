USE [TodoApp]
GO
/****** Object:  Table [dbo].[Todos]    Script Date: 2021. 09. 12. 20:30:50 ******/
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
SET IDENTITY_INSERT [dbo].[Todos] ON 

INSERT [dbo].[Todos] ([Id], [UserId], [Title], [Description], [Deadline], [Priority], [Status], [Deleted]) VALUES (1, N'user1teszt', N'user első todo', N'ennek csak tesztelés miatt van itt a helye', CAST(N'2021-09-26T10:00:00.0000000' AS DateTime2), 0, 0, 0)
INSERT [dbo].[Todos] ([Id], [UserId], [Title], [Description], [Deadline], [Priority], [Status], [Deleted]) VALUES (2, N'user1teszt', N'második', N'kell ez is, hogy a másik ne legyen árva :(', CAST(N'2021-09-13T10:00:00.0000000' AS DateTime2), 0, 0, 0)
INSERT [dbo].[Todos] ([Id], [UserId], [Title], [Description], [Deadline], [Priority], [Status], [Deleted]) VALUES (3, N'Admin', N'admin todo', N'az admin se unatkozzon lehetőleg :)', CAST(N'2021-09-15T10:00:00.0000000' AS DateTime2), 0, 0, 0)
SET IDENTITY_INSERT [dbo].[Todos] OFF
ALTER TABLE [dbo].[Todos]  WITH CHECK ADD  CONSTRAINT [FK_Todos_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Todos] CHECK CONSTRAINT [FK_Todos_AspNetUsers_UserId]
GO
