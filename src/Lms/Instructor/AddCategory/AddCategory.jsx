
import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}category/getcategory`)
      .then((res) => {
        const fetchedCategories = res.data.result.map((category) => ({
          name: category.course_category_name,
          id: category.course_category_id,
        }));
        setCategories(fetchedCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      });
  };

  const handleAddCategory = () => {
    inputFields.forEach(input => {
      if (input.value.trim()) {
        axios
          .post(`${import.meta.env.VITE_REACT_APP_API_URL}category/addcategory`, {
            course_category_name: input.value,
          })
          .then((response) => {
            if (
              response.status === 201
            ) {
              toast.success("Category added successfully");
              fetchCategories();
            }
          })
          .catch((error) => {
            console.error("Error adding new category:", error);
            toast.error("Error adding new category");
          });
      }
    });
  };

  const handleAddInputField = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1, value: "" }]);
  };

  const handleInputChange = (id, newValue) => {
    setInputFields(
      inputFields.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };

  return (
    <div className="courselist-container">
      <ToastContainer />
      <h4 className="heading-center">Course Category Creation</h4>
      <div className=" course-cards-container">
      <div className=" m-3 card d-flex p-1 p-lg-5">
        <div>
          {inputFields.map((input) => (
            <div key={input.id} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="fc1 form-control"
                placeholder="Enter Category name"
                value={input.value}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
              <button
                className="ms-2 plusbtn text-light px-2"
                onClick={handleAddInputField}
              >
                +
              </button>
            </div>
          ))}
          <button
            className="mt-4 rounded-2 updatebtn p-2"
            onClick={handleAddCategory}
          >
            Submit
          </button>
        </div>

        <div>
          <div className="px-0">
            <h4 className="mb-4 mt-4 mt-md-5 categorytitle">Added Category List</h4>
            <div className="flex flex-col space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="card p-2 fc1">
                  <p className="m-0">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AddCategory;
