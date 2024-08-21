const sequelize = require('./app/config/database');
const User = require('./app/models/User');
const Attraction = require('./app/models/Attraction');
const Comment = require('./app/models/Comment');
const Like = require('./app/models/Like');

async function resetDatabase() {
  try {
    // Synchroniser les modèles avec force: true pour tout recréer à partir de zéro
    await sequelize.sync({ force: true });

   
    
    // Insérer des données d'exemple si nécessaire
    await User.bulkCreate([
      { username: 'JohnDoe', email: 'john@example.com', password: 'password123' },
      { username: 'JaneDoe', email: 'jane@example.com', password: 'password123' },
    ]);
    
    await Attraction.bulkCreate([
      { name: 'Attraction1', description: "Description de l'attraction 1" },
      { name: 'Attraction2', description: "Description de l'attraction 2" },
    ]);
    
    await Comment.bulkCreate([
      { user_id: 1, attraction_id: 1, comment: 'Super attraction!' },
      { user_id: 2, attraction_id: 2, comment: 'Pas mal!' },
    ]);

    await Like.bulkCreate([
      { user_id: 1, attraction_id: 1 },
      { user_id: 2, attraction_id: 2 },
    ]);

  } catch (error) {
   
  }
}

resetDatabase();
