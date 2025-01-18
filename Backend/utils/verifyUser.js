import { admin } from "../firebaseAdmin.js"

export const verifyToken = async (req, res, next) => {
    try{
        const token = req.cookies.idToken

        if(!token){
            return res.status(401).json({ success: false, message: 'Unauthorized. Token not provided.' });
        }
        console.log('ere')
        try {
            console.log('ere')
            const decodedToken = await admin.auth().verifyIdToken(token)
            console.log('here')
            req.user = decodedToken;
            next();
        } catch (error) {
            res.status(401).json({ success: false, message: 'Unauthorized. Invalid token.' });
        }

    }catch{
        res.status(401).json({ success: false, message: 'Unauthorized. Invalid token.' });
    }
    
}