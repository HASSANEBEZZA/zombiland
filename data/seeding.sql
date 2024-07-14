-- Création de la table attractions
CREATE TABLE IF NOT EXISTS attractions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table comments
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    attraction_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (attraction_id) REFERENCES attractions(id)
);

-- Création de la table likes
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    attraction_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (attraction_id) REFERENCES attractions(id),
    UNIQUE (user_id, attraction_id)
);

-- Insertion de données dans la table attractions
INSERT INTO attractions (name, description, category, photo_url) VALUES
('Dead Encounter', 'Plongez dans l''horreur avec ''Dead Encounter,'' une expérience cauchemardesque qui vous emmènera au plus profond de vos frayeurs. Cette maison d''horreur interdite aux moins de 18 ans vous mettra au défi de survivre à une série de scènes terrifiantes. Des monstres sanguinaires aux apparitions effrayantes, chaque coin cache une horreur inimaginable. Oserez-vous affronter vos pires cauchemars ?', 'Expérience immersive', 'https://i.postimg.cc/f34n3Kvw/zombie1.webp' ),
('Feast of Shadows', 'Bienvenue à ''Feast of Shadows,'' le restaurant qui repousse les limites de la créativité culinaire. Vous serez plongé dans un univers sombre et mystérieux où les plats prennent vie sous une lumière tamisée. Notre menu propose une délicieuse sélection de mets horrifiques qui vous surprendront à chaque bouchée. Des plats étonnants, inspirés de l''univers macabre, vous attendent pour une expérience gastronomique inoubliable.', 'Restaurant', 'https://i.postimg.cc/NLGhrLRr/zombie17.jpg'),
('Undead Plunge', 'Préparez-vous à vivre une aventure époustouflante avec ''Undead Plunge''. Ce rollercoaster extrême, doté de 20 loopings à couper le souffle, est conçu pour les amateurs de sensations fortes en quête d''adrénaline. Montez à bord de votre wagon et préparez-vous à être propulsé à travers des boucles spectaculaires, des vrilles effrayantes et des descentes à grande vitesse. ''Undead Plunge'' vous promet une expérience de montagnes russes inoubliable que vous n''oserez pas oublier.', 'Rollercoaster', 'https://i.postimg.cc/pyswQxBc/zombie21.jpg'),
('Zombie Parade', 'Bienvenue dans ''Zombie Parade'', une expérience immersive où le cauchemar devient réalité. Alors que vous explorez le parc, des hordes de zombies affamés font leur apparition et vous traquent. Votre survie dépendra de votre capacité à échapper aux morsures des morts-vivants. Plongez dans l''horreur avec cette aventure effrayante où l''adrénaline monte à chaque coin. Oserez-vous survivre à la ''Zombie Parade'' ?', 'Expérience immersive', 'https://i.postimg.cc/21ZgfWNg/zombie20.png'),
('Zombie Thrill', 'Préparez-vous à une expérience de montagnes russes comme aucune autre avec ''Zombie Thrill''. Ce rollercoaster ultra rapide vous propulse à des vitesses vertigineuses atteignant 300 km/h. Vous ressentirez l''adrénaline monter en flèche tandis que vous survolez le parc à une vitesse fulgurante, enchaînant des virages serrés et des descentes à couper le souffle. ''Zombie Thrill'' est conçu pour les amateurs de sensations fortes en quête d''une montée d''adrénaline inoubliable.', 'Rollercoaster', 'https://i.postimg.cc/Ny8VKwM4/zombie24.jpg'),
('Pink Elegance Bistro', 'Bienvenue au ''Pink Elegance Bistro'', un lieu où l''élégance rencontre la féminité dans une ambiance rose chatoyante. Notre restaurant girly friendly vous invite à plonger dans un monde de sophistication et de convivialité. Le décor rose, les détails élégants et une cuisine délicieuse créent une atmosphère chaleureuse et accueillante pour toutes les occasions. Que ce soit pour un déjeuner entre amies, un rendez-vous romantique ou une journée spéciale, ''Pink Elegance Bistro'' vous offre une expérience gastronomique exceptionnelle.', 'Restaurant', 'https://i.postimg.cc/H8nPvctZ/zombie31.avif'),
('Haunted Mansion', 'Entrez dans la ''Haunted Mansion'', une maison hantée remplie de mystères et de fantômes. Chaque pièce raconte une histoire effrayante et chaque coin sombre cache une nouvelle terreur. Pouvez-vous résoudre les énigmes et échapper aux esprits ?', 'Expérience immersive', 'https://i.postimg.cc/BLqzDwPG/zombie28.webp'),
('Vampire''s Lair', 'Explorez ''Vampire''s Lair'', une aventure sombre où vous devrez échapper aux griffes des vampires assoiffés de sang. Trouvez des indices et évitez les pièges pour sortir indemne de cette nuit terrifiante.', 'Expérience immersive', 'https://i.postimg.cc/MXp4pN87/zombie32.jpg'),
('Dark Delights', 'Dégustez des plats exquis dans un cadre inquiétant chez ''Dark Delights''. Ce restaurant unique propose des repas inspirés de l''horreur, créant une expérience culinaire que vous n''oublierez jamais.', 'Restaurant', 'https://i.postimg.cc/WhKxKnCM/zombie16.png'),
('Phantom Ride', 'Montez à bord de ''Phantom Ride'', un rollercoaster fantomatique qui vous emmène à travers des boucles spectaculaires et des descentes vertigineuses. Les apparitions fantomatiques ajoutent une dose supplémentaire de frissons.', 'Rollercoaster', 'https://i.postimg.cc/7CgvS2BS/zombie9.jpg'),
('Gothic Feast', 'Savourez un repas dans une ambiance gothique chez ''Gothic Feast''. Ce restaurant propose une cuisine raffinée avec une touche sombre et mystérieuse, parfaite pour les amateurs de l''étrange.', 'Restaurant', 'https://i.postimg.cc/4mnrBMLf/zombie14.png'),
('Skeleton''s Chase', 'Vivez une aventure palpitante dans ''Skeleton''s Chase''. Échappez aux squelettes en furie tout en explorant un ancien cimetière. Serez-vous assez rapide pour survivre ?', 'Expérience immersive', 'https://i.postimg.cc/BLqzDwPG/zombie28.webp'),
('Midnight Feast', 'Dînez à minuit dans ''Midnight Feast'', un restaurant où les plats sont servis avec une touche de mystère. Chaque repas est une surprise et chaque bouchée est une nouvelle découverte.', 'Restaurant', 'https://i.postimg.cc/dZVzMSJ9/zombie15.jpg'),
('Graveyard Thrill', 'Préparez-vous à une descente vertigineuse avec ''Graveyard Thrill''. Ce rollercoaster vous emmène à travers un cimetière hanté à une vitesse fulgurante, avec des virages serrés et des descentes effrayantes.', 'Rollercoaster', 'https://i.postimg.cc/tZyKk4fw/zombie2.webp'),
('Nightmare Bistro', 'Bienvenue au ''Nightmare Bistro'', un restaurant où chaque plat raconte une histoire d''horreur. Dégustez des mets délicieux dans une atmosphère sombre et inquiétante, parfaite pour les amateurs de frissons.', 'Restaurant', 'https://i.postimg.cc/WhKxKnCM/zombie16.png'),
('Witch''s Brew', 'Découvrez ''Witch''s Brew'', un café mystique où chaque boisson est préparée avec une touche de magie. Savourez des boissons envoûtantes dans une ambiance ensorcelante.', 'Restaurant', 'https://i.postimg.cc/LYNbVBjg/zombie27.webp');


-- Insertion de données dans la table users
INSERT INTO users (username, email, password) VALUES
('hassane_bezza', 'hassane@example.com', 'password123')
ON CONFLICT (username, email) DO NOTHING;

INSERT INTO users (username, email, password) VALUES
('vergine_oclock', 'vergine@example.com', 'password456')
ON CONFLICT (username, email) DO NOTHING;

-- Insertion de données dans la table comments
INSERT INTO comments (user_id, attraction_id, comment) VALUES
(1, 1, 'Terrifiant, mais incroyable!'),
(2, 1, 'Vraiment effrayant, je recommande.'),
(1, 2, 'Une expérience culinaire unique!')
ON CONFLICT (user_id, attraction_id) DO NOTHING;

-- Insertion de données dans la table likes
INSERT INTO likes (user_id, attraction_id) VALUES
(1, 1),
(2, 1),
(1, 2)
ON CONFLICT (user_id, attraction_id) DO NOTHING;

-- Requête pour afficher les attractions avec les commentaires et les likes
SELECT
    a.id AS attraction_id,
    a.name AS attraction_name,
    a.description,
    a.category,
    a.photo_url,
    u.username AS commenter,
    c.comment,
    COALESCE(l.like_count, 0) AS like_count
FROM
    attractions a
LEFT JOIN
    comments c ON a.id = c.attraction_id
LEFT JOIN
    users u ON c.user_id = u.id
LEFT JOIN (
    SELECT
        attraction_id,
        COUNT(*) AS like_count
    FROM
        likes
    GROUP BY
        attraction_id
) l ON a.id = l.attraction_id
ORDER BY
    a.id, c.created_at;
