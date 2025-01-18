import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export {admin}
