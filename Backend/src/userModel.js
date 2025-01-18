import { admin } from '../firebaseAdmin.js';
import bcryptjs from 'bcryptjs'

export const createUser = async ({ username, email, password }) => {
  try{
    const usernameSnapshot = await admin.firestore().collection('users').where('username', '==', username).get()
    if(!usernameSnapshot.empty){
      throw new Error('Username is already taken.')
    }

    const emailSnapshot = await admin.firestore().collection('users').where('email', '==', email).get();
    if (!emailSnapshot.empty) {
      throw new Error('Email is already in use.');
    }

    let userRecord

    const userData = {
      email,
      username,
      admin: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(  )
    }

    userRecord = await admin.auth().createUser({ email, password, displayName: username });
    const hashedPassword = bcryptjs.hashSync(password, 10);
    userData.password = hashedPassword;

    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid:userRecord.uid,
      ...userData
    })

    return userRecord;
  }catch(error){
    throw error
  }
};

export const checkUser = async ({ email, password }) => {
  try {
    const userSnapshot = await admin.firestore().collection('users').where('email', '==', email).get();
    if (userSnapshot.empty) {
      if (!password) {
        console.log('running this to null')
        return null; 
      }
      throw new Error('User not found.')
    }

    const existingUser = userSnapshot.docs[0].data();

    
    if (password) {
      const hashedPassword = existingUser.password;
      const isPasswordCorrect = await bcryptjs.compare(password, hashedPassword);

      if (!isPasswordCorrect) {
        throw new Error('Incorrect password.');
      }
    }

    
    if (!existingUser.uid) {
      throw new Error('User data is incomplete (missing UID).');
    }

    const customToken = await admin.auth().createCustomToken(existingUser.uid);
    return customToken;

  } catch (error) {
    console.error("Error in checkUser:", error);  
    throw error; 
  }
};  

export const checkEmailUser = async ({email}) => {
  try{
    const userSnapShot = await admin.firestore().collection('users').where('email', '==', email).get()

    if(userSnapShot.empty){
      return null
    }

    const existingUser = userSnapShot.docs[0].data()
    return existingUser
  }catch (error){
    console.error('Error in checkUser:', error)
    throw error
  }
}

export const createEmailUser = async ({ username, email, uid }) => {
  try {
    let userRecord

    try {
      userRecord = await admin.auth().getUserByEmail(email)
    } catch (authError) {
      if (authError.code === 'auth/user-not-found') {
        userRecord = await admin.auth().createUser({
          email,
          displayName: username,
          uid,
        })
      } else {
        throw authError
      }
    }

    const userDocRef = admin.firestore().collection('users').doc(userRecord.uid)
    const userDoc = await userDocRef.get()

    if (!userDoc.exists) {
      await userDocRef.set({
        uid: userRecord.uid,
        email: userRecord.email,
        admin: false,
        username: userRecord.displayName || username,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }

    return userRecord
  } catch (error) {
    console.error('Error creating or fetching user:', error)
    throw error
  }
};