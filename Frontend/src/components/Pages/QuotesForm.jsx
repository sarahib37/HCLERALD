import { FaArrowLeft } from "react-icons/fa"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { addQuoteFailure, addQuoteStart, addQuoteSuccess } from "../../redux/user/quoteSlice"

function QuotesForm() {
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.quote)
    const currentUser = useSelector((state) => state.user.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(currentUser)
    function handleInputChange(e) {
        const { id, value, files } = e.target

        if (id === "images") {
            setFormData({
                ...formData,
                images: files,
            });
        } else {
            setFormData({
                ...formData,
                [id]: value,
            });
        }

        if (error) {
            dispatch(addQuoteFailure(null))
        }
    }

    async function handleNewQuote(e) {
        e.preventDefault()
        dispatch(addQuoteStart())
        dispatch(addQuoteFailure(null))

        try {
            const uploadedImageUrls = [];

            if (formData.images && formData.images.length) {
                const files = Array.from(formData.images);

                for (const file of files) {
                    const formDataImage = new FormData()
                    formDataImage.append("image", file)

                    try {
                        const uploadRes = await axios.post(
                            "https://hclerald.vercel.app/api/quote/uploadImage",
                            formDataImage,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );
                        if (uploadRes.data.success) {
                            uploadedImageUrls.push(uploadRes.data.url)
                        } else {
                            throw new Error("Image upload failed")
                        }
                    } catch (error) {
                        throw new Error("Image upload failed: ", error)
                    }
                }
            }
            const quoteData = {
                currentUser,
                type: formData.type,
                category: formData.category,
                quantity: formData.quantity,
                description: formData.description,
                images: uploadedImageUrls,
            }

            const res = await axios.post(
                "https://hclerald.vercel.app/api/quote/addQuote",
                quoteData
            )

            if (res.status === 201) {
                const data = await axios.get('https://hclerald.vercel.app/api/quote/quotes')
                dispatch(addQuoteSuccess(data.data))
                navigate("/quotes")
            } else {
                throw new Error(res.data.message || "Failed to create quote")
            }
        } catch (error) {
            dispatch(addQuoteFailure(error.message))
            console.error("Error submitting quote:", error)
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Link to="/" className="absolute top-4 left-4 text-white">
                <FaArrowLeft className="text-2xl cursor-pointer" />
            </Link>

            <div className="w-full h-full flex flex-col md:flex-row items-center md:items-start justify-center">
                
                <div className="w-full md:w-1/2 h-full px-6 md:px-16 py-8 flex flex-col items-center gap-6 bg-black">
                    <h3 className="text-xl font-semibold text-center">Make a Quote</h3>

                    <form
                        className="w-full max-w-lg flex flex-col gap-4"
                        onSubmit={handleNewQuote}
                    >
                        <label className="flex flex-col gap-2">
                            <span className="font-medium text-sm">Product Type</span>
                            <input
                                required
                                type="text"
                                id="type"
                                className="w-full p-2 border border-blue-600 rounded bg-black text-white"
                                onChange={handleInputChange}
                            />
                        </label>
                        <div className="flex flex-col md:flex-row gap-4">
                            <label className="flex flex-col gap-2 w-full">
                                <span className="font-medium text-sm">
                                    Product Category
                                </span>
                                <select
                                    required
                                    id="category"
                                    className="w-full p-2 border border-blue-600 rounded bg-black text-white"
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a Category</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Paint">Paint</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Packaged Food">Packaged Food</option>
                                    <option value="Market Stalls & Kiosk">
                                        Market Stalls & Kiosk
                                    </option>
                                    <option value="Clothing & Textiles">
                                        Clothing & Textiles
                                    </option>
                                </select>
                            </label>

                            <label className="flex flex-col gap-2 w-full">
                                <span className="font-medium text-sm">Quantity</span>
                                <input
                                    type="number"
                                    required
                                    id="quantity"
                                    className="w-full p-2 border border-blue-600 rounded bg-black text-white"
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <label className="flex flex-col gap-2">
                            <span className="font-medium text-sm">Description</span>
                            <textarea
                                required
                                id="description"
                                className="w-full resize-none p-2 border border-blue-600 rounded bg-black text-white"
                                onChange={handleInputChange}
                            ></textarea>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="font-medium text-sm">Images</span>
                            <input
                                type="file"
                                multiple
                                id="images"
                                accept="image/*"
                                className="w-full p-2 border border-blue-600 rounded bg-black text-white"
                                onChange={handleInputChange}
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold text-lg rounded flex items-center justify-center"
                        >
                            {loading ? "Loading..." : "Submit Quote"}
                        </button>
                    </form>

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>

                <div className="hidden md:block w-1/2 h-full bg-blue-600"></div>
            </div>
        </div>
    );
}

export default QuotesForm;
