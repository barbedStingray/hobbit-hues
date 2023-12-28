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





-- Techniques table 
CREATE TABLE "techniques" (
	"id" SERIAL PRIMARY KEY,
	"technique" VARCHAR (40)
);

DELETE FROM "techniques";
DROP TABLE "techniques";








-- Junction: project table
CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "user",
	"model" VARCHAR (40),
	"primary" VARCHAR (15),
	"description" VARCHAR (500),
	"picture" VARCHAR (50)
);

DROP TABLE "projects";







-- junction: projects_paints
CREATE TABLE "projects_paints" (
	"id" SERIAL PRIMARY KEY,
	"project_id" integer REFERENCES "projects",
	"paint_id" integer REFERENCES "paints"	,
	"technique_id" integer REFERENCES "techniques",
	"photo" VARCHAR (50)
);

DROP TABLE "projects_paints";
















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
('Ahriman Blue', '#00708a'),
('paint', 'hexcode')
;