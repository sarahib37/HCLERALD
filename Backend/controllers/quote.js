import multer from "multer"
import axios from 'axios'
import FormData from "form-data"
import dotenv from "dotenv"
import { admin } from "../firebaseAdmin.js"
import { fetchAllQuotes, updateQuoteInFirebase } from "../src/quoteModel.js"

const storage = multer.memoryStorage()
const upload = multer({ storage }).single('image')
dotenv.config()

export const addNewQuote = async (req, res)=> {
    const {type, category, quantity, description, images, currentUser} = req.body
    console.log(currentUser)

    if (!type || !category || !quantity || !description) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const date = new Date()
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const formattedDate = new Intl.DateTimeFormat('en-us', options).format(date).replace(/\//g, '/')

    const quoteData = {
        type,
        username: currentUser.username,
        uid: currentUser.uid,
        category,
        quantity,
        description,
        status: "pending",
        price: null,
        productionDays: null,
        images: images || [],
        createdDate: formattedDate
    }
    
    try{
        const docRef = await admin.firestore().collection('quotes').add(quoteData)
        
        res.status(201).json({success: true, id: docRef.id, quoteData})
       
    }catch(error){
        console.error("Error adding new quote:", error)
        res.status(500).json({ success: false, error: error.message })
    }
}

export const uploadImage = async (req, res) => {
    
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Error in file upload", error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        try {
            const formData = new FormData()
            formData.append('image', req.file.buffer, req.file.originalname); // Append image buffer and name

            const headers = {
                ...formData.getHeaders(), // Add headers from form-data
              }
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                params: {
                    key: process.env.IMGBB_API_KEY, // Your ImgBB API Key
                },
                headers: headers
            })

            res.status(200).json({ success: true, url: response.data.data.url });

        } catch (error) {
            console.error("Error uploading image to ImgBB:", error);
            res.status(500).json({ message: "Failed to upload image", error: error.message });
        }
    });
}

export const getQuotes = async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('quotes').get();
        const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteQuote = async (req, res) => {
    const {id} = req.params
    try{
        await admin.firestore().collection('quotes').doc(id).delete()
        res.status(200).send({message: "Quote deleted successfully!"})
    }catch(error){
        console.error('Error deleting quote:', error)
        res.status(500).send({message: "Failed to delete the quote"})
    }
}

export const updateQuote = async (req, res) => {
    
    const { quoteId } = req.params; 
    const updatedData = req.body; 

    try {
        await updateQuoteInFirebase(quoteId, updatedData); 
        const quotes = await fetchAllQuotes();
        console.log(quotes)
        res.status(200).json(quotes)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
