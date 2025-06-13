import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getBookIdFromUrl = () => {
  const urlPath = window.location.pathname;
  const pathParts = urlPath.split('/');
  const bookId = pathParts[pathParts.length - 1];
  return bookId;
};

function UpdateBookDetails() {
  const id = getBookIdFromUrl();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [book, setBook] = useState({
    title: "",
    author_detail: "",
    quantity: 0,
    kindle: "",
    audible: "",
    hardcover: "",
    audio_cd: "",
    book_description: "",
    stars: 0,
    editorial_review : "",
    about_author : ""
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getBookById/${id}`);
        setBook({
          title: res.data.book.title || "",
          author_detail: res.data.book.author_detail || "",
          quantity: res.data.book.quantity || 0,
          kindle: res.data.book.kindle || "",
          audible: res.data.book.audible || "",
          hardcover: res.data.book.hardcover || "",
          audio_cd: res.data.book.audio_cd || "",
          book_description: res.data.book.book_description || "",
          stars: res.data.book.stars || 0,
          editorial_review: res.data.book.editorial_review || "",
          about_author: res.data.book.about_author || ""
        });
        
        // Set existing images from response
        if (res.data.book.images) {
          let bookImages = res.data.book.images;
          
          // Handle case where images might be a JSON string
          if (typeof bookImages === 'string') {
            try {
              bookImages = JSON.parse(bookImages);
            } catch (e) {
              console.error("Failed to parse images JSON:", e);
            }
          }
          
          // Ensure we have an array of image paths
          setExistingImages(Array.isArray(bookImages) ? bookImages : 
                          bookImages ? [bookImages] : []);
        }
        
        setIsLoading(false);
      } catch (error) {
        setError("Failed to load book data");
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      const parsedValue = value === '' ? '' : Number(value);
      setBook({
        ...book,
        [name]: parsedValue
      });
    } else {
      setBook({
        ...book,
        [name]: value
      });
    }
  };

  const handleStarClick = (rating) => {
    setBook({
      ...book,
      stars: rating
    });
  };

   const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setSelectedFiles(files);
    
    if (e.target.files.length > 5) {
      toast.info('Maximum 5 files allowed. Only the first 5 files will be uploaded.');
    }
  };

  const handleRemoveSelectedFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formData = new FormData();
      
      Object.keys(book).forEach(key => {
        formData.append(key, book[key]);
      });
      
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });

    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/updateBook/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status === 200) {
      toast.success("Book updated successfully!");
      // navigate("/admin/view-books");
    }
  } catch (error) {
    toast.error("Failed to update book");
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
};


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Loading book data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate("/admin/view-books")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return to Book List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl space-y-5"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-[#001040] mb-4">Update Book Details</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author Details</label>
          <input
            type="text"
            name="author_detail"
            value={book.author_detail}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={book.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Kindle Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="kindle"
              value={book.kindle}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Audible Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="audible"
              value={book.audible}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Hardcover Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="hardcover"
              value={book.hardcover}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Audio CD Price ($)</label>
            <input
              type="number"
              step="0.01"
              name="audio_cd"
              value={book.audio_cd}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Rating (0-5 stars)</label>
          <input
            type="number"
            min="0"
            max="5"
            name="stars"
            value={book.stars}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Star rating visualization */}
          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-5 h-5 ${i < book.stars ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
                onClick={() => handleStarClick(i + 1)}
                style={{cursor: 'pointer'}}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Book Description</label>
          <textarea
            name="book_description"
            value={book.book_description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
            required
            minLength="100"
            maxLength="200"
          />
        </div>

      

        {/* New Images Section */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload New Images (Max 5)</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <small className="text-gray-500">You can select up to 5 images, each max 5MB.</small>
          
          {/* Display selected files */}
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-3 gap-3">
                {Array.from(selectedFiles).map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New image ${index + 1}`}
                      className="w-full h-32 object-cover rounded border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSelectedFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-xs mt-1">
                      {file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Editorial Review</label>
          <textarea
            name="editorial_review"
            value={book.editorial_review}
            onChange={handleChange}
            minLength={50}
            maxLength={1000}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Enter an editorial review (50-1000 characters)"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">About the Author</label>
          <textarea
            name="about_author"
            value={book.about_author}
            onChange={handleChange}
            minLength={50}
            maxLength={1000}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Write about the author (50-1000 characters)"
          />
        </div>


        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#001040] text-white font-semibold py-2 rounded hover:bg-[#00072b] transition"
          >
            {isSubmitting ? "Updating..." : "Update Book"}
          </button>
          <button
            type="button"
            // onClick={() => navigate("/admin/view-books")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateBookDetails;