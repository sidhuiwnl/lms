// import React, { useState, useEffect } from "react";
// import DropdownTreeSelect from "react-dropdown-tree-select";
// import "react-dropdown-tree-select/dist/styles.css";
// import axios from "axios";
// import "./Modulepage.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useParams } from "react-router-dom";

// function Modulepage() {
//   const [textareas, setTextareas] = useState([""]);
//   const [selected, setSelected] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [path, setPath] = useState("");
//   const [courseId, setCourseId] = useState("");
//   const [parentModule, setParentModule] = useState("");
//   const [moduleStructure, setModuleStructure] = useState({});
//   const [selectedModuleId, setSelectedModuleId] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);

//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}course/structured-data`)
//       .then((res) => {
//         setCourses(res.data);
//         setModuleStructure(buildModuleStructure(res.data));
//       })
//       .catch((error) => {
//         toast.error("Failed to fetch courses!");
//         console.error(error);
//       });
//   }, []);

//   const buildModuleStructure = (nodes, parent = null) => {
//     const structure = {};

//     nodes.forEach((node, index) => {
//       const path = `${index + 1}`;
//       structure[node.value] = { path, parent: parent ? parent.value : null };

//       if (node.children && node.children.length > 0) {
//         traverseChildren(node.children, path, structure, node);
//       }
//     });

//     return structure;
//   };

//   const findTopParentValue = (nodeValue) => {
//     const findParent = (nodes, value) => {
//       for (const node of nodes) {
//         if (node.value === value) {
//           return node;
//         }
//         if (node.children && node.children.length > 0) {
//           const result = findParent(node.children, value);
//           if (result) {
//             return result;
//           }
//         }
//       }
//       return null;
//     };

//     let currentNode = findParent(courses, nodeValue);

//     // Traverse up to find the top-most parent
//     while (currentNode && currentNode.parent) {
//       currentNode = findParent(courses, currentNode.parent);
//     }

//     return currentNode ? currentNode.value : null;
//   };

//   const traverseChildren = (children, parentPath, structure, parent) => {
//     children.forEach((child, index) => {
//       const childPath = `${parentPath}/${index + 1}`;
//       structure[child.value] = { path: childPath, parent: parent.value };

//       if (child.children && child.children.length > 0) {
//         traverseChildren(child.children, childPath, structure, child);
//       }
//     });
//   };

//   const findTopMostParent = (nodeValue, nodes) => {
//     for (const node of nodes) {
//       if (node.value === nodeValue) {
//         return null; // This is the topmost parent
//       }

//       if (node.children) {
//         const result = findTopMostParent(nodeValue, node.children);
//         if (result !== null) {
//           return result; // Return the topmost parent found in children
//         }
//       }
//     }

//     return null; // No parent found
//   };

//   const getTopMostParent = (nodeValue) => {
//     return findTopMostParent(nodeValue, courses);
//   };

//   const findNextNumber = (path) => {
//     const parts = path.split("/");
//     if (parts.length === 0) return 1;
//     const lastPart = parts[parts.length - 1];
//     const nextNumber = parseInt(lastPart, 10) + 1;
//     return nextNumber;
//   };

//   const findParentNode = (nodes, nodeValue) => {
//     for (const node of nodes) {
//       if (node.children) {
//         const child = node.children.find((child) => child.value === nodeValue);
//         if (child) {
//           return node; // Parent found
//         }
//         const result = findParentNode(node.children, nodeValue);
//         if (result) return result; // Parent found in a deeper level
//       }
//     }
//     return null; // No parent found
//   };

//   const addNewModule = (parentNode, newModuleName) => {
//     const parentPath = moduleStructure[parentNode.value] || "";
//     const nextNumber = findNextNumber(parentPath);
//     const newPath = `${parentPath}/${nextNumber}`;
//     const newModule = {
//       value: newModuleName,
//       children: [],
//     };

//     const updatedCourses = [...courses];
//     const parent = findParentNode(updatedCourses, parentNode.value);
//     if (parent) {
//       const index = parent.children.findIndex(
//         (child) => child.value === parentNode.value
//       );
//       if (index !== -1) {
//         if (!parent.children[index].children) {
//           parent.children[index].children = [];
//         }
//         parent.children[index].children.push(newModule);
//       }
//     }

//     setModuleStructure((prevStructure) => ({
//       ...prevStructure,
//       [newModuleName]: newPath,
//     }));

//     setCourses(updatedCourses);
//   };

//   const handleChange = (currentNode, selectedNodes, newModuleName) => {
//     setSelected(selectedNodes);
//     setSelectedNode(currentNode);

//     if (currentNode) {
//       const nodePath = moduleStructure[currentNode.value] || "";

//       if (newModuleName) {
//         addNewModule(currentNode, newModuleName);
//       } else {
//         setPath(nodePath); // Ensure nodePath is a string
//       }

//       const parentNode = findParentNode(courses, currentNode.value);
//       setParentModule(parentNode ? parentNode.value : "");
//       setSelectedModuleId(currentNode.value || "");

//       // Get the top-most parent value
//       const topParentValue = findTopParentValue(currentNode.value);
//       console.log("Top Most Parent Value:", topParentValue);
//     }
//   };

//   const addTextarea = () => {
//     setTextareas([...textareas, ""]);
//   };

//   const handleTextareaChange = (index, value) => {
//     const newTextareas = [...textareas];
//     newTextareas[index] = value;
//     setTextareas(newTextareas);
//   };

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const moduleNames = textareas.filter((name) => name.trim() !== "");

//     if (moduleNames.length === 0) {
//       alert("Please enter at least one module name.");
//       return;
//     }

//     // Ensure path is a string
//     const pathParts = typeof path === "string" ? path.split("/") : [];
//     const cleanedPath = pathParts.slice(1).join("/") || "1";
//     const formData = new FormData();
//     formData.append("moduleNames", JSON.stringify(moduleNames));
//     formData.append("path", cleanedPath);
//     formData.append("parentModule", parentModule);
//     formData.append("courseId", courseId);
//     formData.append("selectedModuleId", selectedModuleId);
//     if (selectedFile) {
//       formData.append("moduleImage", selectedFile); // Append the file to the formData
//     }

//     console.log(cleanedPath);
//     console.log(moduleNames);
//     console.log(parentModule);
//     console.log(courseId);
//     console.log(selectedModuleId);
    

//     // axios
//     //   .post(`${process.env.REACT_APP_API_URL}course/addmodule`, formData, {
//     //     headers: {
//     //       "Content-Type": "multipart/form-data",
//     //     },
//     //   })
//     //   .then((res) => {
//     //     console.log(res);
//     //     if (
//     //       res.data.message === "moduleNames is mandatory and should be an array"
//     //     ) {
//     //       toast.error("moduleNames is mandatory and should be an array");
//     //     } else if (res.data.message === "modules added successfully") {
//     //       toast.success("Modules added successfully");
//     //       setTextareas([""]);
//     //       setModuleStructure((prev) => ({
//     //         ...prev,
//     //         [cleanedPath]: cleanedPath,
//     //       }));
//     //       setSelectedFile(null); // Clear the selected file after successful submission
//     //     } else if (res.data.message === "db_error") {
//     //       toast.error("Database error occurred!");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     toast.error("There was an error creating the modules!", error);
//     //   });
//   };

//   return (
//     <div className="container-fluid">
//       <h3 className="text-center my-2 headinginstructor">Add Module</h3>
//       <div className=" modpart p-3 rounded-2">
//         {/* <div className="d-flex flex-row justify-content-around w-100 ">
//         <h6>Select the Course</h6>
//         <DropdownTreeSelect
//         style={{width:"100%",border:"0px"}}
//           data={courses}
//           onChange={handleChange}
//           className="bootstrap-demo w-100"
//           texts={{ placeholder: "Select..." }}
//           value={selectedNode ? [selectedNode] : []}
//         />
//         </div> */}
//         <ToastContainer />
//         <div>
//           <form onSubmit={handleSubmit}>
//             <div className="w-100">
//               <div className="form-group-inner p-0 m-0 w-100 border-0">
//                 <label className="labelcourse">Select the Course</label>
//                 <DropdownTreeSelect
//                   data={courses}
//                   onChange={handleChange}
//                   className="bootstrap-demo fc1 custom-dropdown border-0  rounded-2"
//                   texts={{ placeholder: "Select..." }}
//                   value={selectedNode ? [selectedNode] : []}
//                 />
//                 <ToastContainer />
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="form-group-inner">
//                 <label className="labelcourse">Add New Module</label>
//                 {textareas.map((textarea, index) => (
//                   <div
//                     key={index}
//                     className="my-2 d-flex align-items-center w-100"
//                   >
//                     <input
//                       type="text"
//                       value={textarea}
//                       onChange={(e) =>
//                         handleTextareaChange(index, e.target.value)
//                       }
//                       className="form-control fc1"
//                       placeholder={`Enter Module Name ${index + 1}`}
//                     />
//                     <Link to={`/instructordashboard/${id}/updatemodule`}>
//                       <i
//                         className="fas fa-pencil-alt ms-2"
//                         style={{
//                           cursor: "pointer", // Optional: make it look clickable
//                           color: "#001040", // Optional: adjust color as needed
//                         }}
//                       />
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="form-group">
//               <div className="form-group-inner">
//                 <label htmlFor="moduleImage" className="labelcourse">
//                   Module Image
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control fc1"
//                   id="moduleImage"
//                   onChange={handleFileChange}
//                 />
//               </div>
//             </div>
//             <div className="d-flex justify-content-end">
//               <button type="submit" className="formbtn my-2 updatebtn">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modulepage;

// ------------------------------------------

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modulepage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

function Modulepage() {
  const [textareas, setTextareas] = useState([""]);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getcourse`)
      .then((res) => {
        console.log(res.data.result);
        setCourses(res.data.result);
      })
      .catch((error) => {
        console.error("Failed to fetch courses:", error);
      });
  }, []);

  const addTextarea = () => {
    setTextareas([...textareas, ""]);
  };

  const handleTextareaChange = (index, value) => {
    const newTextareas = [...textareas];
    newTextareas[index] = value;
    setTextareas(newTextareas);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const moduleNames = textareas.filter((name) => name.trim() !== "");

    if (moduleNames.length === 0) {
      alert("Please enter at least one module name.");
      return;
    }

    if (!selectedCourseId) {
      alert("Please select a course.");
      return;
    }

    const formData = new FormData();
    formData.append("moduleNames", JSON.stringify(moduleNames));
    formData.append("selectedModuleId", selectedCourseId);
    formData.append("parentModule", selectedCourseId)
    formData.append("path", selectedCourseId)
    if (selectedFile) {
      formData.append("moduleImage", selectedFile); // Append the file to the formData
    }

    // Uncomment this to make the API call
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}course/addmodule`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.message === "modules added successfully") {
          toast.success("Modules added successfully");
          setTextareas([""]);
          setSelectedFile(null); // Clear the selected file after successful submission
        } else if (res.data.message === "db_error") {
          toast.error("Database error occurred!");
        }
      })
      .catch((error) => {
        toast.error("There was an error creating the modules!");
        console.error(error);
      });
  };

  return (
    <div className="courselist-container">
      <h3 className="heading-center">Add Module</h3>
        <ToastContainer />
        <div className=" course-cards-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <div className="form-group-inner w-100">
              <label className="labelcourse">Select the Course</label>
              <select
                className="form-control fc1 custom-dropdown border-0 rounded-2 w-100"
                value={selectedCourseId} // The current state storing the selected course ID
                onChange={(e) => {
                  const selectedId = e.target.value; // Get the selected course ID
                  setSelectedCourseId(selectedId); // Update state with the selected course ID
                  console.log("Selected Course ID:", selectedId); // Log the selected ID
                }}
              >
                <option value="" disabled>
                  Select a course...
                </option>
                {courses.map((course) => (
                  <option key={course.courseid} value={course.courseid}>
                    {course.coursename}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label className="labelcourse">Add New Module</label>
              {textareas.map((textarea, index) => (
                <div
                  key={index}
                  className="my-2 d-flex align-items-center w-100"
                >
                  <input
                    type="text"
                    value={textarea}
                    onChange={(e) =>
                      handleTextareaChange(index, e.target.value)
                    }
                    className="form-control fc1"
                    placeholder={`Enter Module Name ${index + 1}`}
                  />
                  <Link to={`/instructordashboard/${id}/updatemodule`}>
                    <i
                      className="fas fa-pencil-alt ms-2"
                      style={{
                        cursor: "pointer",
                        color: "#001040",
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <div className="form-group-inner">
              <label htmlFor="moduleImage" className="labelcourse">
                Module Image
              </label>
              <input
                type="file"
                className="form-control fc1"
                id="moduleImage"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="formbtn my-2 updatebtn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modulepage;
