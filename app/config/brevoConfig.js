const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config(); // Charger les variables d'environnement depuis .env

// Configure le SDK avec votre clé API Brevo
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY; // Utilisation de la variable d'environnement

module.exports = { SibApiV3Sdk };
