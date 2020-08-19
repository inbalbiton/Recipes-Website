CREATE TABLE [dbo].[Recipes](
	[Id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
	[Name] [varchar](300) NOT NULL,
    [MakingTime] [varchar](300) NOT NULL,
    [Servings] [INTEGER] NOT NULL,
    [Popularity] [INTEGER],
    [Vegan] [BIT] NOT NULL, --IF 1 => IS VEGAN
    [Vegetarian] [BIT] NOT NULL, --IF 1 => IS VEGE 
    [Gluten] [BIT] NOT NULL, -- IF 1 => IS WITH GLUTEN
	PRIMARY KEY (Id)
);

CREATE TABLE [dbo].[Cuisines](
    [Recipe_id] [UNIQUEIDENTIFIER] NOT NULL,
    [Cuisines_name] [varchar] NOT NULL

    PRIMARY KEY (Recipe_id,cuisines_name),
    FOREIGN KEY (Recipe_id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[Diet](
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Diet_Name] [VARCHAR] NOT NULL

    PRIMARY KEY (Recipe_Id, Diet_Name),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[Intolerance](
	[Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL ,
	[Intolerance_Name] [VARCHAR](300) NOT NULL
	PRIMARY KEY (Recipe_Id, Intolerance_Name),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[IngredientAndQuantity](
    [Id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Name] [VARCHAR](2000) NOT NULL,
    [Quantity] [VARCHAR](200),
    [Unit_Measure] [VARCHAR](2000),
    PRIMARY KEY (Id,Recipe_Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[Steps](
    [Step_Number] [INTEGER] NOT NULL ,
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Description] [VARCHAR](8000),
    PRIMARY KEY (Step_Number,Recipe_Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[PhotosRecipe](
    [Photo_Link] [VARCHAR](6000) NOT NULL,
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    PRIMARY KEY (Photo_Link,Recipe_Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);

CREATE TABLE [dbo].[FamilyRecipes](
    [User_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Owner] [VARCHAR](2000),
    [RecipePeriod] [VARCHAR](2000),
    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
    FOREIGN KEY (User_Id) REFERENCES Users(user_id),
);

CREATE TABLE [dbo].[PersonalRecipe](
    [User_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
    FOREIGN KEY (User_Id) REFERENCES Users(user_id),
);

CREATE TABLE [dbo].[UserSavedRecipe](
    [User_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Id] [INTEGER] NOT NULL,

    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (User_Id) REFERENCES users(user_id),
);

CREATE TABLE [dbo].[UserWatchedRecipe](
    [User_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Id] [INTEGER] NOT NULL,
    [Watched_Date] [VARCHAR](2000) Not NULL,

    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (User_Id) REFERENCES users(user_id),
);

CREATE TABLE [dbo].[UserMeals](
    [User_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
    [Level] [Integer] NOT NULL,

    PRIMARY KEY (User_Id,Recipe_Id),
    FOREIGN KEY (User_Id) REFERENCES users(user_id),
    FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
);


DROP TABLE [dbo].[FamilyRecipes];
DROP TABLE [dbo].[PhotosRecipe];
DROP TABLE [dbo].[Recipes];
DROP TABLE [dbo].[Diet];
DROP TABLE [dbo].[Cuisines];
DROP TABLE [dbo].[IngredientAndQuantity];
DROP TABLE [dbo].[Steps];




-- CREATE TABLE [dbo].[Steps](
--     [Step_Number] [INTEGER] NOT NULL ,
--     [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
--     [Tool_Id] [UNIQUEIDENTIFIER] NOT NULL,
--     [Ingrediants_Id] [UNIQUEIDENTIFIER] NOT NULL,
--     [Description] [VARCHAR](8000),
--     PRIMARY KEY (Step_Number,Recipe_Id,Tool_Id,Ingrediants_Id),
--     FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
--     FOREIGN KEY (Tool_Id) REFERENCES Tools(Id),
--     FOREIGN KEY (Ingrediants_Id) REFERENCES IngredientAndQuantity(Id),   
-- );

-- CREATE TABLE [dbo].[Tools](
--     [Id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
--     [Name] [VARCHAR](2000) NOT NULL,
--     [Image] [VARCHAR](2000),
--     [Num] [INTEGER],
--     [Unit] [VARCHAR](2000),
--     PRIMARY KEY (Id),
-- );

-- CREATE TABLE [dbo].[IngredientAndQuantity](
--     [Id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
--     [Name] [VARCHAR](2000) NOT NULL,
--     [Quantity] [FLOAT],
--     PRIMARY KEY (Id),
-- );

-- CREATE TABLE [dbo].[Steps](
--     [Step_Number] [INTEGER] NOT NULL ,
--     [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL,
--     [Tool_Id] [UNIQUEIDENTIFIER] NOT NULL,
--     [Ingrediants_Id] [UNIQUEIDENTIFIER] NOT NULL,
--     [Description] [VARCHAR](8000),
--     PRIMARY KEY (Step_Number,Recipe_Id,Tool_Id,Ingrediants_Id),
--     FOREIGN KEY (Recipe_Id) REFERENCES Recipes(Id),
--     FOREIGN KEY (Tool_Id) REFERENCES Tools(Id),
--     FOREIGN KEY (Ingrediants_Id) REFERENCES IngredientAndQuantity(Id),   
-- );
-- CREATE TABLE [dbo].[SpooncalureWatch](
--     [Recipe_Id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),
--     [Recipe_Id_Spoon] [INTEGER] 
-- )

SELECT * from UserSavedRecipe

ALTER TABLE UserSavedRecipe
DROP COLUMN Recipe_Id;

TRUNCATE TABLE UserSavedRecipe

DROP TABLE UserWatchedRecipe

select * from UserWatchedRecipe


ALTER TABLE [dbo].[users]
ADD first_name [VARCHAR](300),
    last_name [varchar](300),
    profile_image [varchar](1000),
    country [VARCHAR](300)

UPDATE users set 
users.username = 'noashab',
users.first_name = 'Noa',
users.last_name = 'Shabtay',
users.profile_image = 'https://res.cloudinary.com/dgsma1lqy/image/upload/v1591370674/profileImages/%D7%90%D7%A0%D7%99_xgbuay.jpg',
users.country = 'Israel'
where user_id = 'b2ebb57d-b18f-4df0-be1f-1d054ff0d688';

INSERT INTO [dbo].[UserSavedRecipe] VALUES
('b2ebb57d-b18f-4df0-be1f-1d054ff0d688',492560);
INSERT INTO [dbo].[UserSavedRecipe] VALUES
('b2ebb57d-b18f-4df0-be1f-1d054ff0d688',559251);
INSERT INTO [dbo].[UserSavedRecipe] VALUES
('b2ebb57d-b18f-4df0-be1f-1d054ff0d688',630293);

 
 
INSERT INTO [dbo].[UserWatchedRecipe] VALUES
('b2ebb57d-b18f-4df0-be1f-1d054ff0d688',492560, '492560492560492560' );
INSERT INTO [dbo].[UserWatchedRecipe] VALUES
('b2ebb57d-b18f-4df0-be1f-1d054ff0d688',559251, '559251559251559251');
INSERT INTO [dbo].[UserWatchedRecipe] VALUES
('b2ebb57d-b18f-4df0-be1f-1d054ff0d688',630293, '630293630293630293');

 