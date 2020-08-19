/*
CREATE TABLE [dbo].[Recipes](
	[Id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
	[Name] [varchar](300) NOT NULL,
    [Image] [varchar](6000) NOT NULL,
    [MakingTime] [varchar](300) NOT NULL,
    [Servings] [Integer] NOT NULL,
    [Popularity] [Integer] NOT NULL,
    [Vegan] [BIT] NOT NULL,
    [Vegetarian] [BIT] NOT NULL,
    [Gluten] [BIT] NOT NULL,
	PRIMARY KEY (Id)
);

CREATE TABLE [dbo].[Cuisines](
    [Recipe_id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
    [Cuisines_name] [varchar] NOT NULL

    PRIMARY KEY (Recipe_id,cuisines_name),
    FOREIGN KEY (Recipe_id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[Diet](
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
    [Diet_Name] [VARCHAR] NOT NULL

    PRIMARY KEY (Recipe_Id,Diet_Name),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);
*/
CREATE TABLE [dbo].[UserSavedRecipe](
    [User_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL

    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (User_Id) REFERENCES users(Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[UserWatchedRecipe](
    [User_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Watched_Date] [DATETIME] Not NULL

    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (User_Id) REFERENCES users(Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[UserMeals](
    [Meal_Id] [Integer] NOT NULL,
    [Recipe_Id] [Integer] NOT NULL,
    [Level] [Integer] NOT NULL,

    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (User_Id) REFERENCES users(Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);


