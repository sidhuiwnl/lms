

import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import * as XLSX from "xlsx";
import axios from "axios"; // Make sure axios is imported
import "./Question.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { FaPlus, FaUpload } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "reactstrap";

const Question = () => {
  const [content, setContent] = useState("");
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [correctOption, setCorrectOption] = useState("");
  const [options, setOptions] = useState([{ option: "", feedback: "" }]);
  const [showFeedback, setShowFeedback] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [keywords, setKeywords] = useState([
    { keyword: "", marks: "", feedback: "" },
  ]);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moduleStructure, setModuleStructure] = useState([]); // State to store fetched data
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [parentModuleId, setParentModuleId] = useState(null);
  const [matchLeft, setMatchLeft] = useState([""]); // State for left side items
  const [matchRight, setMatchRight] = useState([""]); // State for right side items
  const editorRef = useRef(null);
  const [correctOptions, setCorrectOptions] = useState([]);

  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseid, setCourseid] = useState();
  const [moduleid, setModuleid] = useState();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/structured-data`)
      .then((res) => {
        console.log(res.data);
        setModuleStructure(res.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch courses!"); // Or use a toast if you prefer
      });
  }, []);

  // Fetch courses on component mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getcourse`)
      .then((res) => {
        setCourses(res.data.result);
      })
      .catch((error) => {
        console.error("Failed to fetch courses:", error);
      });
  }, []);

  // Fetch modules when the selected course changes
  useEffect(() => {
    if (selectedCourse) {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}course/getmodules/${selectedCourse}`
        )
        .then((res) => {
          setModules(res.data || []);
        })
        .catch((error) => {
          console.error("Failed to fetch modules:", error);
          setModules([]);
        });
    } else {
      setModules([]);
    }
  }, [selectedCourse]);

  const handleChange = (currentNode, selectedNodes) => {
    setSelected(selectedNodes);

    if (currentNode) {
      setSelectedModuleId(currentNode.value); // Use 'value' for module ID

      // Find the parent ID using the utility function
      const parentId = findParentNode(moduleStructure, currentNode.value);
      setParentModuleId(parentId);
    }

    if (currentNode && currentNode.label) {
      console.log(`Selected: ${currentNode.label}`);
    }

    console.log("Selected Nodes:", selectedNodes);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const findParentNode = (data, childValue) => {
    for (let node of data) {
      if (node.children && node.children.length > 0) {
        if (node.children.some((child) => child.value === childValue)) {
          return node.value; // Found the parent
        }
        const parent = findParentNode(node.children, childValue);
        if (parent) {
          return parent;
        }
      }
    }
    return null; // No parent found
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
    setCorrectOption("");
  };

  const handleCorrectOptionChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const toggleFeedback = (index) => {
    const newShowFeedback = [...showFeedback];
    newShowFeedback[index] = !newShowFeedback[index];
    setShowFeedback(newShowFeedback);
  };

  const handleKeywordChange = (index, field, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = { ...newKeywords[index], [field]: value };
    setKeywords(newKeywords);
  };

  const addKeyword = () => {
    setKeywords([...keywords, { keyword: "", marks: "", feedback: "" }]);
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setUploadedQuestions(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const [matchFeedback, setMatchFeedback] = useState([{ feedback: "" }]); // Initialize feedback as an array of objects

  // Handler for changes in left/right items
  const handleMatchChange = (index, value, side) => {
    if (side === "left") {
      const newMatchLeft = [...matchLeft];
      newMatchLeft[index] = value;
      setMatchLeft(newMatchLeft);
    } else {
      const newMatchRight = [...matchRight];
      newMatchRight[index] = value;
      setMatchRight(newMatchRight);
    }
  };

  // Handler for feedback change
  const handleMatchFeedbackChange = (index, value) => {
    const newFeedback = [...matchFeedback];
    newFeedback[index].feedback = value; // Store feedback as an object
    setMatchFeedback(newFeedback);
  };

  // Function to add new match pairs
  const addMatchPair = () => {
    setMatchLeft([...matchLeft, ""]); // Add a new left item
    setMatchRight([...matchRight, ""]); // Add a new right item
    setMatchFeedback([...matchFeedback, { feedback: "" }]); // Initialize feedback for new pair
  };

  // Function to remove match pairs
  const removeMatchPair = (index) => {
    setMatchLeft(matchLeft.filter((_, i) => i !== index));
    setMatchRight(matchRight.filter((_, i) => i !== index));
    setMatchFeedback(matchFeedback.filter((_, i) => i !== index)); // Remove feedback for the pair
  };

  const [selectedCourseDetails, setSelectedCourseDetails] = useState({
    courseId: "",
    course_category_id: "",
  });

  const [selectedModule, setSelectedModule] = useState("");

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    setCourseid(selectedCourseId);
    const selectedCourse = courses.find(
      (course) => course.courseid.toString() === selectedCourseId
    );
    if (selectedCourse) {
      setSelectedCourse(selectedCourseId);
      setSelectedCourseDetails({
        courseId: selectedCourse.courseid,
        course_category_id: selectedCourse.course_category_id,
      });
      setSelectedModule("");
    }
  };

  // Handle module change
  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };

  const handleSubmit = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append form fields to the FormData object
    formData.append("content", content);
    formData.append("questionType", questionType);
    formData.append("correctOption", correctOption);
    formData.append("selectedModuleId", selectedModule);
    formData.append("parentModuleId", selectedCourse);
    formData.append("correct", JSON.stringify(correctOptions));

    if (questionType === "multiple_choice" || questionType === "true/false") {
      formData.append("options", JSON.stringify(options)); // Append options
    }

    if (questionType === "description") {
      formData.append("keywords", JSON.stringify(keywords)); // Append keywords for descriptive questions
    }

    if (questionType === "check") {
      console.log(correctOptions);
      formData.append("options", JSON.stringify(options)); // Append keywords for descriptive questions
    }

    if (questionType === "match_following") {
      const matches = matchLeft.map((left, index) => ({
        leftItem: left,
        rightItem: matchRight[index],
      }));

      formData.append("matches", JSON.stringify(matches)); // Append the matches

      formData.append("feedback", JSON.stringify(matchFeedback));
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}quiz/addquestion`,
        formData
      );

      console.log(res.data);

      if (res.data.message === "quiz_added") {
        toast.success("Added successfully");

        // Clear all input and box values by resetting state
        setContent("");
        setQuestionType("multiple choice");
        setCorrectOption("");
        setOptions([
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
        ]);
        setShowFeedback([false, false, false, false]);
        setKeywords([{ keyword: "", marks: "", feedback: "" }]);
        setUploadedQuestions([]);
        setSelected([]);
        setSelectedModuleId(null);
        setParentModuleId(null);

        // Reset the JoditEditor content
        if (editorRef.current) {
          editorRef.current.editor.setValue(""); // Clear the editor content
        }
      } else if (res.data.error === "db_error") {
        toast.error(res.data.error);
        // Handle DB error
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addOption = () => {
    setOptions([...options, { option: "", feedback: "" }]); // Add new empty option
    setShowFeedback([...showFeedback, false]); // Add corresponding feedback toggle for the new option
  };

  return (
    <div className="courselist-container">
      <ToastContainer />
      <h3 className="heading-center">Quiz</h3>
      <div className="course-cards-container">
        <form>
          <div className="form-group my-1">
            <div className="form-group-inner">
              <label className="labelcourse">Course Name</label>
              <Input
                type="select"
                id="courseSelect"
                value={selectedCourse}
                onChange={handleCourseChange}
                className="rounded-0 fc1"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option
                    key={course.courseid}
                    value={course.courseid.toString()}
                  >
                    {course.coursename}
                  </option>
                ))}
              </Input>
            </div>
          </div>

          <div className="form-group my-1">
            <div className="form-group-inner">
              <label className="labelcourse">Module Name</label>

              <Input
                type="select"
                id="moduleSelect"
                value={selectedModule}
                onChange={handleModuleChange}
                className="rounded-0 fc1 w-100">
                <option value="">Select Module</option>
                {modules.map((module) => (
                  <option
                    key={module.moduleid}
                    value={module.moduleid.toString()}>
                    {module.modulename}
                  </option>
                ))}
              </Input>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-inner w-100">
              <label htmlFor="questionType" className="labelcourse">
                Select Question Type
              </label>
              <select
                id="questionType"
                value={questionType}
                onChange={handleQuestionTypeChange}
                className="w-100 fc1">
                <option value="Select Question Type" disabled>Select Question type</option>
                <option value="multiple choice">Multiple Choice</option>
                <option value="description">Description</option>
                {/* <option value="true/false">True/False</option> */}
                <option value="match_following">match_following</option>
                <option value="check">Multi Select</option>
              </select>
            </div>
          </div>
        </form>

        <div className="d-flex justify-content-between py-2">
          <label className="labelcourse">Quiz Question</label>
          <Link to={`/instructordashboard/${id}/updatequestion`}>
            <button
              className="btn updatebtn"
              style={{ color: "#ffa200", backgroundColor: "#001040" }}
            >
              Update Question
            </button>
          </Link>
        </div>

        <JoditEditor
          className="fc1 border-0"
          ref={editorRef}
          value={content}
          config={{
            readonly: false,
            toolbar: true,
          }}
          onBlur={handleEditorChange}
        />

        {questionType === "check" && (
          <div style={{ marginTop: "10px" }}>
            {options.map((optionObj, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <label htmlFor={`option${index + 1}`} className="labelcourse">
                  Option {index + 1}:
                </label>
                <input
                  className="py-2"
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C, D, etc.
                  value={optionObj.option}
                  onChange={(e) =>
                    handleOptionChange(index, "option", e.target.value)
                  }
                />
                <button
                  className="m-3 feedbackbtn rounded-2"
                  onClick={() => toggleFeedback(index)}
                >
                  {showFeedback[index] ? "Hide Feedback" : "Add Feedback"}
                </button>
                {showFeedback[index] && (
                  <div className="feedback" style={{ marginTop: "10px" }}>
                    <label>Feedback for Option {index + 1}:</label>
                    <JoditEditor
                      className="fc1"
                      value={optionObj.feedback}
                      config={{
                        readonly: false,
                        toolbar: true,
                      }}
                      onBlur={(newContent) =>
                        handleOptionChange(index, "feedback", newContent)
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add the "+" button to add new options dynamically */}
            <div className="add-option-btn mt-3">
              <button className="btn btn-outline-danger" onClick={addOption}>
                <FaPlus /> Add Option
              </button>
            </div>

            {/* Checkbox for correct options */}
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label>Select Correct Options:</label>
              <div style={{ marginLeft: "10px" }}>
                {options.map(
                  (option, index) =>
                    option.option.trim() && (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={`correctOption${index}`}
                          checked={correctOptions.includes(option.option)} // Check if this option is in the correctOptions array
                          onChange={(e) => {
                            const updatedCorrectOptions = e.target.checked
                              ? [...correctOptions, option.option] // Add the option if checked
                              : correctOptions.filter(
                                  (opt) => opt !== option.option // Remove the option if unchecked
                                );
                            setCorrectOptions(updatedCorrectOptions);
                          }}
                        />
                        <label
                          htmlFor={`correctOption${index}`}
                          style={{ marginLeft: "8px" }}
                        >
                          {option.option}
                        </label>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        )}

        {/* {questionType === "true/false" && (
          <div className="true-false-options" style={{ marginTop: "10px" }}>   
          </div>
        )} */}

        {questionType === "match_following" && (
          <div style={{ marginTop: "10px" }}>
            <h5>Match the Following:</h5>
            {matchLeft.map((leftItem, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <input
                    type="text"
                    value={leftItem}
                    onChange={(e) =>
                      handleMatchChange(index, e.target.value, "left")
                    }
                    placeholder={`Left Item ${index + 1}`}
                    className="form-control mx-1"
                    style={{ width: "200px" }}
                  />
                  <input
                    type="text"
                    value={matchRight[index] || ""}
                    onChange={(e) =>
                      handleMatchChange(index, e.target.value, "right")
                    }
                    placeholder={`Right Item ${index + 1}`}
                    className="form-control mx-1"
                    style={{ width: "200px" }}
                  />
                  <button
                    onClick={() => removeMatchPair(index)}
                    className="btn btn-danger btn-sm mx-1"
                  >
                    Remove
                  </button>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <label>Feedback for Pair {index + 1}:</label>
                  <JoditEditor
                    className="fc1"
                    value={matchFeedback[index]?.feedback || ""} // Controlled value as a string
                    config={{ readonly: false, toolbar: true }}
                    onBlur={
                      (newContent) =>
                        handleMatchFeedbackChange(index, newContent) // Store feedback
                    }
                  />
                </div>
              </div>
            ))}
            <button onClick={addMatchPair} className="btn btn-secondary mt-2">
              <FaPlus /> Add Pair
            </button>
          </div>
        )}

        {questionType === "multiple_choice" && (
          <div style={{ marginTop: "10px" }}>
            {options.map((optionObj, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <label htmlFor={`option${index + 1}`} className="labelcourse">
                  Option {index + 1}:
                </label>
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C, D, etc.
                  value={optionObj.option}
                  onChange={(e) =>
                    handleOptionChange(index, "option", e.target.value)
                  }
                />
                <button
                  className="m-3 feedbackbtn rounded-2"
                  onClick={() => toggleFeedback(index)}
                >
                  {showFeedback[index] ? "Hide Feedback" : "Add Feedback"}
                </button>
                {showFeedback[index] && (
                  <div className="feedback py-2" style={{ marginTop: "10px" }}>
                    <label>Feedback for Option {index + 1}:</label>
                    <JoditEditor
                      className="fc1"
                      value={optionObj.feedback}
                      config={{
                        readonly: false,
                        toolbar: true,
                      }}
                      onBlur={(newContent) =>
                        handleOptionChange(index, "feedback", newContent)
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add the "+" button to add new options dynamically */}
            <div className="add-option-btn mt-3">
              <button className="btn btn-outline-danger" onClick={addOption}>
                <FaPlus /> Add Option
              </button>
            </div>

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label className="labelcourse">Select Correct Option</label>{" "}
              &nbsp;
              <select
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
              >
                <option>Select Correct Option</option>
                {options.map(
                  (option, index) =>
                    option.option.trim() && (
                      <option key={index} value={option.option}>
                        {option.option}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        )}

        {questionType === "description" && (
          <div style={{ marginTop: "20px" }}>
            <h5>Keywords</h5>
            {keywords.map((keyword, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <label>Keyword {index + 1}:</label>
                <input
                  type="text"
                  value={keyword.keyword}
                  onChange={(e) =>
                    handleKeywordChange(index, "keyword", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />
                <label style={{ marginLeft: "20px" }}>Marks:</label>
                <input
                  type="text"
                  value={keyword.marks}
                  onChange={(e) =>
                    handleKeywordChange(index, "marks", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />

                {/* Feedback for each keyword */}
                <div style={{ marginTop: "10px" }}>
                  <label>Feedback:</label>
                  <JoditEditor
                    className="fc1"
                    value={keyword.feedback}
                    config={{ readonly: false, toolbar: true }}
                    onBlur={(newContent) =>
                      handleKeywordChange(index, "feedback", newContent)
                    }
                  />
                </div>

                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => removeKeyword(index)}
                >
                  {" "}
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-3">
              <button className="btn btn-outline-primary" onClick={addKeyword}>
                <FaPlus /> Add Keyword
              </button>
            </div>
          </div>
        )}

        <div className="col-sm-12 col-md-6 mt-4">
          <button
            className="btn"
            style={{ color: "#ffa200", backgroundColor: "#001040" }}
            onClick={handleSubmit}
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
