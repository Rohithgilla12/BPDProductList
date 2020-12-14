const algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");
const firebase = require("firebase");

// load values from the .env file in this directory into process.env
dotenv.config();

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_APP_ID,
});
const firestore = firebase.firestore();

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

var records = [];
firestore
  .collection("products")
  .get()
  .then((documentSnapshot) => {
    documentSnapshot.forEach((document) => {
      if (document.exists) {
        let product = document.data();
        product.objectID = product.id;
        records = records.concat(product);
      }
    });
    // Add or update new objects
    index
      .saveObjects(records)
      .then(() => {
        console.log("Products imported into Algolia");
      })
      .catch((error) => {
        console.error("Error when importing contact into Algolia", error);
        process.exit(1);
      });
  });
