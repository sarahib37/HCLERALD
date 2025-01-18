import { admin } from "../firebaseAdmin.js"
import { checkEmailUser, checkUser, createEmailUser, createUser } from "../src/userModel.js"

export const signup = async (req, res) => {
    try {           
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }

        const userRecord = await createUser({ username, email, password });

        const userToken = await admin.auth().createCustomToken(userRecord.uid)

        res.cookie('authToken', userToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        })

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                uid: userRecord.uid,
                username: userRecord.displayName,
                email: userRecord.email,
                admin:userRecord.admin
            },
            token: userToken
        });
    } catch (error) {
        console.error('Error in signup:', error.message);

        if (error.message === 'Username is already taken.') {
            return res.status(400).json({ success: false, error: error.message });
        }

        if (error.message === 'Email is already in use.') {
            return res.status(400).json({ success: false, error: error.message });
        }

        return res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
    }
};


export const signIn = async (req, res) => {

    try{
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }

        const userToken = await checkUser({email, password})
        const userSnapshot = await admin.firestore().collection('users').where('email', '==', email).get()

        if(userSnapshot.empty){
            throw new Error('User not found.')
        }

        const userData = userSnapshot.docs[0].data()

        res.cookie('authToken', userToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: userToken,
            user: {
                uid: userData.uid,
                username: userData.username,
                email: userData.email,
                admin: userData.admin
            }
        });

    }catch(error){
        console.error('Error in signup:', error.message);

        const errorMessage = error.message === 'User not found.' || error.message === 'Incorrect password.' ? error.message : 'An unexpected error occurred.';

        return res.status(400).json({success: false, error: errorMessage})

    }
}

export const google = async (req, res) => {
    try{
        const {name, email, uid} = req.body  

        let user = await checkEmailUser({email})
        let userToken

        if (user){
            userToken = await admin.auth().createCustomToken(uid)
        }else{
            await createEmailUser({username: name, email, uid})
            userToken = await admin.auth().createCustomToken(uid)
            user = {uid, username: name, email}
        }

        res.cookie('authToken', userToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: 'lax',
        });

        res.status(200).json({
            success: true,
            message: 'Google Authentication successful',
            token: userToken,
            user: {
                uid: user.uid,
                username: user.username,
                email: user.email,
                admin: user.admin
            }
        });
    }catch(error){
        console.error('Error in Google Authentication', error)
        res.status(500).json({error: error.message || 'Internal server error'})
    }
}

export const signOut = async (req, res) => {
    try{
        res.clearCookie('auth_token')
        res.status(200).json({success: true, message: 'User has been logged out.'})
    }catch(error){
        return res.status(400).json({success: false, error: error.message})
    }
}