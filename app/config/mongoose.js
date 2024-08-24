const { MongoClient, ServerApiVersion } = require('mongodb');

// Assurez-vous que les caractères spéciaux dans le mot de passe sont correctement encodés
const uri = "mongodb+srv://bezhassan:Alinebezza1%21%21@cluster0.diynq.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connecter le client au serveur
    await client.connect();
    // Envoyer un ping pour confirmer une connexion réussie
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
  } finally {
    // Assurez-vous que le client sera fermé lorsque vous aurez fini
    await client.close();
  }
}

run().catch(console.dir);
