const sequelize = require("../config/database.js");
const Attraction = require("./Attraction.js");
const User = require("./User.js");
const Comment = require("./Comment.js");
const Like = require("./Like.js");

// Définition des relations entre les modèles
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

Attraction.hasMany(Comment, { foreignKey: "attraction_id" });
Comment.belongsTo(Attraction, { foreignKey: "attraction_id" });

User.belongsToMany(Attraction, {
  through: Like,
  foreignKey: "user_id",
  as: "LikedAttractions",
});
Attraction.belongsToMany(User, {
  through: Like,
  foreignKey: "attraction_id",
  as: "Likes",
});

Like.belongsTo(User, { foreignKey: "user_id", as: "User" });
Like.belongsTo(Attraction, { foreignKey: "attraction_id", as: "Attraction" });
User.hasMany(Like, { foreignKey: "user_id", as: "UserLikes" });
Attraction.hasMany(Like, {
  foreignKey: "attraction_id",
  as: "AttractionLikes",
});

// Synchronisation des modèles avec la base de données sans perdre les données
sequelize.sync({ alter: true }).then(async () => {
  // Vérifier si des données d'exemple existent déjà pour éviter les doublons
  const attractionCount = await Attraction.count();
  const userCount = await User.count();
  const commentCount = await Comment.count();
  const likeCount = await Like.count();

  if (attractionCount === 0) {
    // Insertion de données d'exemple pour Attraction
    await Attraction.bulkCreate([
      {
        name: "Dead Encounter",
        description:
          "Plongez dans l'horreur avec \"Dead Encounter,\" une expérience cauchemardesque qui vous emmènera au plus profond de vos frayeurs. Cette maison d'horreur interdite aux moins de 18 ans vous mettra au défi de survivre à une série de scènes terrifiantes. Des monstres sanguinaires aux apparitions effrayantes, chaque coin cache une horreur inimaginable. Oserez-vous affronter vos pires cauchemars ?",
        category: "Expérience immersive",
        photo_url: "https://i.postimg.cc/f34n3Kvw/zombie1.webp",
      },
      {
        name: "Feast of Shadows",
        description:
          'Bienvenue à "Feast of Shadows", le restaurant qui repousse les limites de la créativité culinaire. Vous serez plongé dans un univers sombre et mystérieux où les plats prennent vie sous une lumière tamisée. Notre menu propose une délicieuse sélection de mets horrifiques qui vous surprendront à chaque bouchée. Des plats étonnants, inspirés de l\'univers macabre, vous attendent pour une expérience gastronomique inoubliable.',
        category: "Restaurant",
        photo_url: "https://i.postimg.cc/NLGhrLRr/zombie17.jpg",
      },
      {
        name: "Undead Plunge",
        description:
          'Préparez-vous à vivre une aventure époustouflante avec "Undead Plunge". Ce rollercoaster extrême, doté de 20 loopings à couper le souffle, est conçu pour les amateurs de sensations fortes en quête d\'adrénaline. Montez à bord de votre wagon et préparez-vous à être propulsé à travers des boucles spectaculaires, des vrilles effrayantes et des descentes à grande vitesse. "Undead Plunge" vous promet une expérience de montagnes russes inoubliable que vous n\'oserez pas oublier.',
        category: "Rollercoaster",
        photo_url: "https://i.postimg.cc/pyswQxBc/zombie21.jpg",
      },
      {
        name: "Zombie Parade",
        description:
          'Bienvenue dans "Zombie Parade", une expérience immersive où le cauchemar devient réalité. Alors que vous explorez le parc, des hordes de zombies affamés font leur apparition et vous traquent. Votre survie dépendra de votre capacité à échapper aux morsures des morts-vivants. Plongez dans l\'horreur avec cette aventure effrayante où l\'adrénaline monte à chaque coin. Oserez-vous survivre à la "Zombie Parade" ?',
        category: "Expérience immersive",
        photo_url: "https://i.postimg.cc/21ZgfWNg/zombie20.png",
      },
      {
        name: "Zombie Thrill",
        description:
          'Préparez-vous à une expérience de montagnes russes comme aucune autre avec "Zombie Thrill". Ce rollercoaster ultra rapide vous propulse à des vitesses vertigineuses atteignant 300 km/h. Vous ressentirez l\'adrénaline monter en flèche tandis que vous survolez le parc à une vitesse fulgurante, enchaînant des virages serrés et des descentes à couper le souffle. "Zombie Thrill" est conçu pour les amateurs de sensations fortes en quête d\'une montée d\'adrénaline inoubliable.',
        category: "Rollercoaster",
        photo_url: "https://i.postimg.cc/Ny8VKwM4/zombie24.jpg",
      },
      {
        name: "Pink Elegance Bistro",
        description:
          'Bienvenue au "Pink Elegance Bistro", un lieu où l\'élégance rencontre la féminité dans une ambiance rose chatoyante. Notre restaurant girly friendly vous invite à plonger dans un monde de sophistication et de convivialité. Le décor rose, les détails élégants et une cuisine délicieuse créent une atmosphère chaleureuse et accueillante pour toutes les occasions. Que ce soit pour un déjeuner entre amies, un rendez-vous romantique ou une journée spéciale, "Pink Elegance Bistro" vous offre une expérience gastronomique exceptionnelle.',
        category: "Restaurant",
        photo_url: "https://i.postimg.cc/H8nPvctZ/zombie31.avif",
      },
      {
        name: "Haunted Mansion",
        description:
          'Entrez dans la "Haunted Mansion", une maison hantée remplie de mystères et de fantômes. Chaque pièce raconte une histoire effrayante et chaque coin sombre cache une nouvelle terreur. Pouvez-vous résoudre les énigmes et échapper aux esprits ?',
        category: "Expérience immersive",
        photo_url: "https://i.postimg.cc/BLqzDwPG/zombie28.webp",
      },
      {
        name: "Vampire's Lair",
        description:
          'Explorez "Vampire\'s Lair", une aventure sombre où vous devrez échapper aux griffes des vampires assoiffés de sang. Trouvez des indices et évitez les pièges pour sortir indemne de cette nuit terrifiante.',
        category: "Expérience immersive",
        photo_url: "https://i.postimg.cc/MXp4pN87/zombie32.jpg",
      },
      {
        name: "Dark Delights",
        description:
          "Dégustez des plats exquis dans un cadre inquiétant chez \"Dark Delights\". Ce restaurant unique propose des repas inspirés de l'horreur, créant une expérience culinaire que vous n'oublierez jamais.",
        category: "Restaurant",
        photo_url: "https://i.postimg.cc/WhKxKnCM/zombie16.png",
      },
      {
        name: "Phantom Ride",
        description:
          'Montez à bord de "Phantom Ride", un rollercoaster fantomatique qui vous emmène à travers des boucles spectaculaires et des descentes vertigineuses. Les apparitions fantomatiques ajoutent une dose supplémentaire de frissons.',
        category: "Rollercoaster",
        photo_url: "https://i.postimg.cc/7CgvS2BS/zombie9.jpg",
      },
      {
        name: "Gothic Feast",
        description:
          'Savourez un repas dans une ambiance gothique chez "Gothic Feast". Ce restaurant propose une cuisine raffinée avec une touche sombre et mystérieuse, parfaite pour les amateurs de l\'étrange.',
        category: "Restaurant",
        photo_url: "https://i.postimg.cc/4mnrBMLf/zombie14.png",
      },
      {
        name: "Skeleton's Chase",
        description:
          'Vivez une aventure palpitante dans "Skeleton\'s Chase". Échappez aux squelettes en furie tout en explorant un ancien cimetière. Serez-vous assez rapide pour survivre ?',
        category: "Expérience immersive",
        photo_url: "https://i.postimg.cc/BLqzDwPG/zombie28.webp",
      },
      {
        name: "Midnight Feast",
        description:
          'Dînez à minuit dans "Midnight Feast", un restaurant où les plats sont servis avec une touche de mystère. Chaque repas est une surprise et chaque bouchée est une nouvelle découverte.',
        category: "Restaurant",
        photo_url: "https://i.postimg.cc/dZVzMSJ9/zombie15.jpg",
      },
      {
        name: "Graveyard Thrill",
        description:
          'Préparez-vous à une descente vertigineuse avec "Graveyard Thrill". Ce rollercoaster vous emmène à travers un cimetière hanté à une vitesse fulgurante, avec des virages serrés et des descentes effrayantes.',
        category: "Rollercoaster",
        photo_url: "https://i.postimg.cc/tZyKk4fw/zombie2.webp",
      },
      {
        name: "Nightmare Bistro",
        description:
          'Bienvenue au "Nightmare Bistro", un restaurant où chaque plat raconte une histoire d\'horreur. Dégustez des mets délicieux dans une atmosphère sombre et inquiétante, parfaite pour les amateurs de frissons.',
        category: "Restaurant",
        photo_url: "https://i.postimg.cc/WhKxKnCM/zombie16.png",
      },
      {
        name: "Witch's Brew",
        description:
          'Découvrez "Witch\'s Brew", un café mystique où chaque boisson est préparée avec une touche de magie. Savourez des boissons envoûtantes dans une ambiance ensorcelante.',
        category: "Restaurant",
        photo_url: "https://i.postimg.cc/LYNbVBjg/zombie27.webp",
      },
    ]);
  } else {
  }

  if (userCount === 0) {
    // Insertion de données d'exemple pour User
    await User.bulkCreate([
      {
        username: "john_doe",
        email: "john@example.com",
        password: "password123",
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password456",
      },
    ]);
  }
  if (commentCount === 0) {
    // Insertion de données d'exemple pour Comment
    await Comment.bulkCreate([
      {
        user_id: 1,
        attraction_id: 1,
        comment: "Terrifiant, mais incroyable!",
      },
      {
        user_id: 2,
        attraction_id: 1,
        comment: "Vraiment effrayant, je recommande.",
      },
      {
        user_id: 1,
        attraction_id: 2,
        comment: "Une expérience culinaire unique!",
      },
    ]);
  }

  if (likeCount === 0) {
    // Insertion de données d'exemple pour Like
    await Like.bulkCreate([
      { user_id: 1, attraction_id: 1 },
      { user_id: 2, attraction_id: 1 },
      { user_id: 1, attraction_id: 2 },
    ]);
  }
});

// Export des modèles Attraction, User, Comment, et Like
module.exports = {
  Attraction,
  User,
  Comment,
  Like,
};
