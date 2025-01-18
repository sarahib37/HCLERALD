import { admin } from "../firebaseAdmin.js";

const db = admin.firestore();

// Update Quote Function
export const updateQuoteInFirebase = async (quoteId, updatedData) => {
    try {
        const quoteRef = db.collection("quotes").doc(quoteId)
        await quoteRef.update(updatedData); // `update` is a method on the document reference
    } catch (error) {
        console.error("Error updating the document:", error);
        throw error;
    }
};

// Fetch All Quotes from Firebase
export const fetchAllQuotes = async () => {
    try {
        const quotesCollection = db.collection("quotes"); // Get a reference to the collection
        const snapshot = await quotesCollection.get(); // Fetch all documents in the collection

        // Map over the documents and return their data
        return snapshot.docs.map((doc) => ({
            id: doc.id, // Document ID
            ...doc.data(), // Document fields
        }));
        
    } catch (error) {
        console.error("Error fetching quotes:", error);
        throw error;
    }
};