import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminBookForm() {
  const [form, setForm] = useState({
    title: '',
    author_detail: '',
    quantity: 1,
    kindle: '',
    audible: '',
    hardcover: '',
    audio_cd: '',
    book_description: '',
    stars: 1
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      const parsedValue = value === '' ? '' : Number(value);
      setForm({
        ...form,
        [name]: parsedValue
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };
  console.log("Current stars value:", form);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setSelectedFiles(files);
    
    if (e.target.files.length > 5) {
      toast.info('Maximum 5 files allowed. Only the first 5 files will be uploaded.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(); 
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });
      
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addBook`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
            // If you need authorization, add it here
            // 'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 201 || response.status === 200) {
        toast.success("Book added successfully");  
        setForm({
          title: '',
          author_detail: '',
          quantity: 1,
          kindle: '',
          audible: '',
          hardcover: '',
          audio_cd: '',
          book_description: '',
          stars: 1,
          editorial_review : "",
          about_author : ""
        });
        setSelectedFiles([]);
      } else {
        toast.error(response.data.message || "Failed to add book");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.error || "An error occurred while adding the book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='py-10 w-full h-full'>
       <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
       <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="author_detail" className="block font-medium mb-1">Author Detail</label>
          <input
            type="text"
            name="author_detail"
            id="author_detail"
            value={form.author_detail}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Format Prices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="kindle" className="block font-medium mb-1">Kindle Price</label>
            <input
              type="text"
              name="kindle"
              id="kindle"
              step="any"
              value={form.kindle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="audible" className="block font-medium mb-1">Audible Price</label>
            <input
              type="text"
              name="audible"
              id="audible"
              step="any"
              value={form.audible}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="hardcover" className="block font-medium mb-1">Hardcover Price</label>
            <input
              type="text"
              name="hardcover"
              id="hardcover"
              step="any"
              value={form.hardcover}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="audio_cd" className="block font-medium mb-1">Audio CD Price</label>
            <input
              type="text"
              name="audio_cd"
              id="audio_cd"
              step="any"
              value={form.audio_cd}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="book_description" className="block font-medium mb-1">Book Description</label>
          <textarea
            name="book_description"
            id="book_description"
            value={form.book_description}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
            required
            minLength="100"
            maxLength="200"
          />
        </div>

        <div>
          <label htmlFor="stars" className="block font-medium mb-1">Stars (1–5)</label>
          <input
            type="number"
            name="stars"
            id="stars"
            min="1"
            max="5"
            value={form.stars}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {/* Add visualization of stars */}
          <div className="flex mt-2">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-5 h-5 ${i < form.stars ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
                onClick={() => setForm({...form, stars: i + 1})}
                style={{cursor: 'pointer'}}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="images" className="block font-medium mb-1">Upload Book Images (Max 5)</label>
          <input type="file" name="images" id="images" accept="image/*" multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"/>
          <small className="text-gray-500">You can select up to 5 images, each max 5MB.</small>   
          {/* Display selected files */}
          {selectedFiles.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Selected files:</p>
              <ul className="text-sm text-gray-600">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="mt-1">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
              <div>
        <label htmlFor="editorial_review" className="block font-medium mb-1">Editorial Review</label>
        <textarea
          name="editorial_review"
          id="editorial_review"
          value={form.editorial_review}
          onChange={handleChange}
          rows={4}
          className="w-full border p-2 rounded"
          required
          minLength="100"
          maxLength="200"
        />
      </div>

      <div>
        <label htmlFor="about_author" className="block font-medium mb-1">About the Author</label>
        <textarea
          name="about_author"
          id="about_author"
          value={form.about_author}
          onChange={handleChange}
          rows={4}
          className="w-full border p-2 rounded"
          required
          minLength="100"
          maxLength="200"
        />
      </div>


        <button
          type="submit"
          className="px-4 py-2 bg-[#ffa200] text-white rounded"
          disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Book'}
        </button>
      </form>
        </div> 
      <ToastContainer/>
    </section>
  );
}