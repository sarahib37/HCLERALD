import bcryptjs from 'bcryptjs'
import { admin } from '../firebaseAdmin.js';

export const updateUserInfo = async (req, res) => {
    try{
        if(req.user.uid !== req.params.id){
            return res.status(401).json({ success: false, message: 'You can only update your own account!' });
        }
        const updates = {}

        if(req.body.password){
            updates.password = bcryptjs.hashSync(req.body.password, 10)
        }

        if(req.body.email){
            const emailSnapshot = await admin.firestore().collection('users').where("email", "==", req.body.email).get()

            if(!emailSnapshot.empty && emailSnapshot.docs[0].id !== req.params.id){
                return res.status(400).json({success:false, message:'Email is already in use.'})
            }

            updates.email = req.body.email

            await admin.auth().updateUser(req.params.id, {email: req.body.email})
        }

        if(req.body.username){
            const usernameSnapshot = await admin.firestore().collection('users').where("username", "==", req.body.username).get()

            if(!usernameSnapshot.empty && usernameSnapshot.docs[0].id !== req.params.id){
                return res.status(400).json({success:false, message:'Username is already taken.'})
            }

            updates.username = req.body.username
        }

        const userDocRef = admin.firestore().collection('users').doc(req.params.id);

        await userDocRef.update(updates)

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            
        })
    }catch(error){
            return res.status(500).json({
                success: false,
                message: error.message || 'Internal server error'
            })
    }
}

export const deleteUser = async (req, res)=>{
    if(req.user.uid !== req.params.id){
        return res.status(401).json({ success: false, message: 'You can only delete your own account!' });
    }
    console.log('hlo')
    try{
        
        const userId = req.user.uid

        await admin.auth().deleteUser(userId)

        const db = admin.firestore() 
        const userDocRef = db.collection('users').doc(userId)

        await userDocRef.delete()

        return res.status(200).json({ success: true, message: 'Account deleted successfully.' })
    }catch(error){
        return res.status(500).json({ success: false, message: 'Failed to delete account. Please try again.' });
    }
}

export const getUsers = async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { admin: isAdmin } = req.body;
    console.log(admin)
    try {
        await admin.firestore().collection('users').doc(id).update({ admin: isAdmin });
        console.log('hello')
        res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}