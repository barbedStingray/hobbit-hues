-- User Table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

DROP TABLE "user";






-- Paints table 
CREATE TABLE "paints" (
	"id" SERIAL PRIMARY KEY,
	"paint" VARCHAR (40),
	"hexcode" VARCHAR (20)
);

DELETE FROM "paints";
DROP TABLE "paints";


-- paint dropdown axios --
SELECT * FROM "paints"
ORDER BY "paint" ASC
;






-- Techniques table 
CREATE TABLE "techniques" (
	"id" SERIAL PRIMARY KEY,
	"technique" VARCHAR (40)
);

DELETE FROM "techniques";
DROP TABLE "techniques";


SELECT * FROM "techniques";


INSERT INTO "techniques" ("technique")
VALUES

-- Basic
('Base'),
('Layer'),
('Underpaint'),
('Zenithal Priming'),

-- Highlights
('Highlight'),
('Edge Highlight'),
('Wash (Shade)'),

-- Texture
('Dry Brush'),
('Splatter'),
('Stipple'),
('Technical'),

-- Blend
('Glaze (Contrast)'),
('Wet Blend'),
('Feather'),
('Two Brush Blend'),
('Loaded Brush Feather'),

-- Airbrush
('Airbrush')

;






-- Junction: project table
CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "user",
	"model" VARCHAR (80),
	"primary" VARCHAR (25),
	"description" VARCHAR (600),
	"picture" VARCHAR (300)
);

DROP TABLE "projects";

ALTER TABLE "projects"
ADD "public" boolean default false;

-- GET projects request
SELECT * FROM "projects" WHERE "user_id" = 1
ORDER BY "model" ASC
;

-- GET project Details request
SELECT * FROM "projects" where "id" = 29;



-- Add to Projects from SQL
INSERT INTO "projects" ("user_id", "model", "primary", "description", "picture")
VALUES
('2', 'b1 battle droid', '#54302a', 'got it', 'photo here');

-- edit projects PUT 
UPDATE "projects" 
SET "description" = 'best droid ever', "picture" = 'some new url'
WHERE "id" = 47
;

-- update project public
UPDATE "projects"
SET "public" = NOT public
WHERE "id" = 76;


SELECT * FROM "projects"
JOIN "user" ON "user"."id" = "projects"."user_id"
ORDER BY "model" ASC, "username" ASC
;


SELECT 
	"projects"."id",
	"projects"."description",
	"projects"."model",
	"projects"."picture",
	"projects"."primary",
	"user"."username"
FROM "projects" 
JOIN "user" ON "user"."id" = "projects"."user_id"
WHERE "public" = TRUE
ORDER BY RANDOM() LIMIT 5
;



-- junction: projects_paints
CREATE TABLE "projects_paints" (
	"id" SERIAL PRIMARY KEY,
	"project_id" integer REFERENCES "projects",
	"paint_id" integer REFERENCES "paints",
	"technique_id" integer REFERENCES "techniques",
	"photo" VARCHAR (300),
	"notes" VARCHAR (50)
);

DROP TABLE "projects_paints";

-- GET request to return paints for a project
SELECT 
	"projects_paints"."id",
	"projects_paints"."photo",
	"paints"."paint",
	"paints"."hexcode",
	"techniques"."technique"

FROM "projects_paints" 
JOIN "paints" ON "paints"."id" = "projects_paints"."paint_id"
JOIN "techniques" ON "techniques"."id" = "projects_paints"."technique_id"


WHERE "projects_paints"."project_id" = 48
ORDER BY "projects_paints"."id" DESC
;

-- DELETE paints from a project
DELETE FROM "projects_paints"
WHERE "project_id" = 27
;

-- DELETE the project 
DELETE FROM "projects"
WHERE "id" = 27
;

-- DELETE single paint from project
DELETE FROM "projects_paints"
WHERE "id" = 43;

-- altering the project paints table














-- base and layer
INSERT INTO "paints" ("paint", "hexcode")
VALUES
('Thondia Brown', '#54302a'),
('Hobgrot Hide', '#a1812b'),
('Orruk Flesh', '#8cc176'),
('Runelord Brass', '#483a2d'),
('Balthasar Gold', '#563624'),
('Zandri Dust', '#988e56'),
('XV-88', '#6c4811'),
('Warplock Bronze', '#763526'),
('Waaagh! Flesh', '#0a3b36'),
('Thousand Sons Blue', '#00506f'),
('The Fang', '#405b71'),
('Stegadon Scale Green', '#07455d'),
('Steel Legion Drab', '#584e2d'),
('Screaming Bell', '#935335'),
('Screamer Pink', '#7a0f44'),
('Rhinox Hide', '#462f30'),
('Retributor Armour', '#b58135'),
('Rakarth Flesh', '#9d998d'),
('Naggaroth Night', '#3b2b50'),
('Mournfang Brown', '#490f06'),
('Mephiston Red', '#960c09'),
('Mechanicus Standard Grey', '#39484a'),
('Macragge Blue', '#0f3d7c'),
('Leadbelcher', '#4c5154'),
('Khorne Red', '#650001'),
('Kantor Blue', '#01134e'),
('Jokaero Orange', '#ed3815'),
('Ionrach Skin', '#97a384'),
('Incubi Darkness', '#092e32'),
('Dryad Bark', '#2b2a24'),
('Deathworld Forest', '#546229'),
('Daemonette Hide', '#655f82'),
('Celestra Grey', '#8ca3a3'),
('Castellan Green', '#264715'),
('Caliban Green', '#003d15'),
('Caledor Sky', '#366699'),
('Averland Sunset', '#fbb81b'),
('Abaddon Black', '#000000'),
('Wraithbone', '#dbd1b2'),
('Corax White', '#ffffff'),
('Morghast Bone', '#c0a973'),
('Barak-Nur Burgundy', '#451636'),
('Iron Warriors', '#413f3e'),
('Grey Knights Steel', '#717f8b'),
('Iron Hands Steel', '#6f6963'),
('Lupercal', '#002c2b'),
('Corvus Black', '#171314'),
('Night Lords Blue', '#012b5c'),
('Gal Vorbak Red', '#4b213c'),
('Death Korps Drab', '#3e4539'),
('Phoenician Purple', '#440052'),
('Grey Seer', '#a1a5a7'),
('Canoptek Alloy', '#a78f8a'),
('Yriel Yellow', '#ffd900'),
('Xereus Purple', '#47125a'),
('Wild Rider Red', '#e82e1c'),
('White Scar', '#ffffff'),
('Wazdakka Red', '#880805'),
('Warpstone Glow', '#11702a'),
('Warpfiend Grey', '#66656e'),
('Warboss Green', '#327e57'),
('Ushabti Bone', '#aba173'),
('Ungor Flesh', '#d1a560'),
('Ulthuan Grey', '#c4ddd5'),
('Tuskgor Fur', '#863231'),
('Troll Slayer Orange', '#f16c23'),
('Thunderhawk Blue', '#396a70'),
('Temple Guard Blue', '#239489'),
('Teclis Blue', '#3777bf'),
('Tau Light Ochre', '#bc6b11'),
('Tallarn Sand', '#a07409'),
('Sycorax Bronze', '#815b4d'),
('Sybarite Green', '#16a166'),
('Straken Green', '#597f1b'),
('Stormhost Silver', '#b6bcbf'),
('Squig Orange', '#a74d42'),
('Sotek Green', '#0d6371'),
('Slaanesh Grey', '#8a8893'),
('Skrag Brown', '#8b4807'),
('Skavenblight Dinge', '#45413b'),
('Skarsnik Green', '#588f6b'),
('Screaming Skull', '#b9c099'),
('Runefang Steel', '#999ea2'),
('Pink Horror', '#8e2757'),
('Pallid Wych Flesh', '#caccbb'),
('Ogryn Camo', '#96a548'),
('Moot Green', '#3daf44'),
('Lothern Blue', '#2b9bcc'),
('Loren Forest', '#486c25'),
('Liberator Gold', '#b38a4b'),
('Kislev Flesh', '#d1a570'),
('Karak Stone', '#b7945c'),
('Ironbreaker', '#5c6162'),
('Hoeth Blue', '#4c78af'),
('Gorthor Brown', '#5f463f'),
('Genestealer Purple', '#7658a5'),
('Gehennas Gold', '#9c460f'),
('Hashut Copper', '#7d4f32'),
('Fenrisian Grey', '#6d94b3'),
('Evil Sunz Scarlet', '#c01411'),
('Eshin Grey', '#494b4e'),
('Emperors Children', '#b74073'),
('Doombull Brown', '#570003'),
('Dawnstone', '#697068'),
('Dark Reaper', '#354d4c'),
('Calgar Blue', '#2a497f'),
('Cadian Fleshtone', '#c47652'),
('Brass Scorpion', '#692a0f'),
('Bestigor Flesh', '#d08951'),
('Baneblade Brown', '#8f7c67'),
('Balor Brown', '#875409'),
('Auric Armour Gold', '#d48932'),
('Altdorf Guard Blue', '#2c4696'),
('Administratum Grey', '#989c94'),
('Fulgurite Copper', '#995226'),
('Flayed One Flesh', '#eec483'),
('Word Bearers Red', '#620105'),
('Vulkan Green', '#223c2e'),
('Castellax Bronze', '#80411f'),
('Phalanx Yellow', '#ffe201'),
('Sons of Horus Green', '#00545e'),
('Kakophoni Purple', '#8869ae'),
('Lugganath Orange', '#f69b82'),
('Blue Horror', '#9eb5ce'),
('Krieg Khaki', '#bcbb7e'),
('Dechala Lilac', '#b598c9'),
('Fulgrim Pink', '#f3abca'),
('Dorn Yellow', '#fff559'),
('Baharroth Blue', '#53bdca'),
('Gauss Blaster Green', '#80c1a5'),
('Kabalite Green', '#008962'),
('Fire Dragon Bright', '#f4864e'),
('Deathclaw Brown', '#af634e'),
('Ahriman Blue', '#00708a')
;

-- shades, technical, dry, and contrast
INSERT INTO "paints" ("paint", "hexcode")
VALUES
-- contrast
('Nighthaunt Gloom', '#4c838a'),
('Hexwraith Flame', '#00a237'),
('Magmadroth', '#e75a26'),
('Baal Red', '#c81a25'),
('Doomfire Magenta', '#c90077'),
('Dreadful Visage', '#b9a3b8'),
('Sigvald Burgundy', '#730050'),
('Leviathan Purple', '#19044c'),
('Stormfiend', '#015783'),
('Celestium Blue', '#154e8b'),
('Asurmen Blue', '#0169a8'),
('Pylar Glacier', '#40afe5'),
('Frostheart', '#01577f'),
('Briar Queen Chill', '#70abbb'),
('Kroxigor Scales', '#007b8e'),
('Imperial Fist', '#fbae15'),
('Bad Moon Yellow', '#fecc07'),
('Ironjawz Yellow', '#e0ae43'),
('Striking Scorpion Green', '#098840'),
('Karandras Green', '#007e3a'),
('Gutrippa Flesh', '#4b804d'),
('Aeldari Emerald', '#007468'),
('Mantis Warriors Green', '#5d883d'),
('Ratling Grime', '#645f5d'),
('Black Legion', '#202121'),
('Garaghaks Sewer', '#735325'),
('Terradon Turquoise', '#01798c'),
('Plaguebearer Flesh', '#9ea969'),
('Aethermatic Blue', '#61a7b5'),
('Talassar Blue', '#004c88'),
('Black Templar', '#2e2e2e'),
('Basilicanum Grey', '#4d4e4e'),
('Space Wolves Grey', '#5d809e'),
('Gryph-Charger Grey', '#6f9db5'),
('Apothecary White', '#c9d8e7'),
('Darkoath Flesh', '#ae746a'),
('Guilliman Flesh', '#b26b5f'),
('Fyreslayer Flesh', '#8e5d4c'),
('Wyldwood', '#513631'),
('Cygor Brown', '#4c2725'),
('Gore-Grunta Fur', '#713d14'),
('Snakebite Leather', '#845820'),
('Skeleton Horde', '#beb18e'),
('Aggaros Dunes', '#887b4c'),
('Militarum Green', '#737e18'),
('Creed Camo', '#2a6d43'),
('Ork Flesh', '#006523'),
('Nazdreg Yellow', '#936800'),
('Dark Angels Green', '#012d27'),
('Akhelian Green', '#005c75'),
('Ultramarines Blue', '#113060'),
('Leviadon Blue', '#00122c'),
('Magos Purple', '#906187'),
('Shyish Purple', '#391e50'),
('Volupus Pink', '#71022a'),
('Flesh Tearers Red', '#630906'),
('Blood Angels Red', '#970e11'),
('Gryph-Hound Orange', '#b3431c'),
('Iyanden Yellow', '#e69814'),
('Luxion Purple', '#340b5f'),
-- shade
('Fuegan Orange', '#9e5631'),
('Coelia Greenshade', '#1a8079'),
('Druchii Violet', '#6c496f'),
('Casandora Yellow', '#ed9f5b'),
('Carroburg Crimson', '#754457'),
('Seraphim Sepia', '#976f4a'),
('Drakenhof Nightshade', '#62666f'),
('Athonian Camoshade', '#868664'),
('Biel-Tan Green', '#557656'),
('Agrax Earthshade', '#786a5c'),
('Reikland Fleshshade', '#836551'),
('Nuln Oil', '#464443'),
('Soulblight Grey', '#bab4b6'),
('Berserker Bloodshade', '#c14365'),
('Tyran Blue', '#449dcd'),
('Mortarion Grime', '#bdb446'),
('Targor Rageshade', '#968996'),
('Poxwalker', '#72a6a8'),
('Kroak Green', '#91c49e'),
-- technical
('Tesseract Glow', '#49ad33'),
('Ardcoat', '#fffffe'),
('Waystone Green', '#1c503b'),
('Typhus Corrosion', '#373a22'),
('Nurgles Rot', '#9d8b16'),
('Nihilakh Oxide', '#66b39a'),
('Spiritstone Red', '#882b15'),
('Soulstone Blue', '#223461'),
('Stirland Mud', '#482b00'),
('Valhallan Blizzard', '#fffffd'),
('Agrellan Badland', '#ab9678'),
('Agrellan Earth', '#ae9a7c'),
('Mordant Earth', '#302c2d'),
('Blood for the Blood God', '#600007'),
('Stormshield', '#fffffc'),
('Astrogranite Debris', '#949494'),
('Astrogranite', '#767675'),
('Armageddon Dunes', '#dbbd31'),
('Armageddon Dust', '#d5b109'),
('Stirland Battlemire', '#70490d'),
('Martian Ironcrust', '#cf705d'),
-- dry
('Wrack White', '#d3d0cf'),
('Underhive Ash', '#bcbb7e'),
('Tyrant Skull', '#c8c483'),
('Sylvaneth Bark', '#4e483b'),
('Ryza Rust', '#f16c23'),
('Praxeti White', '#fffffb'),
('Nurgling Green', '#7e975d'),
('Necron Compound', '#dadddf'),
('Lucius Lilac', '#b598c9'),
('Imrik Blue', '#208abf'),
('Hexos Palesun', '#fff55a'),
('Golden Griffon', '#dfb476'),
('Eldar Flesh', '#e8c07f'),
('Astorath Red', '#a9311e')
;














