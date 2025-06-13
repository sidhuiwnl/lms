import axios from "axios";
import React, { useEffect, useState } from "react";

function QuestionBankUpdate() {
  const [module, setModule] = useState([]); // Module data
  const [moduleid, setModuleId] = useState(""); // Selected module ID
  const [allQuestions, setAllQuestions] = useState([]); // All questions from API
  const [selectedQuestions, setSelectedQuestions] = useState([]); // Questions for the current module

  // Fetch all modules on component mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}course/getmodule`)
      .then((res) => {
        setModule(res.data.result); // Populate module data
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
      });
  }, []);

  // Fetch questions when module ID changes
  useEffect(() => {
    if (moduleid) {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}quiz/updatequestionbank/${moduleid}`
        )
        .then((res) => {
          setSelectedQuestions(res.data.questions); // Populate selected questions
        })
        .catch((err) => {
          console.error("Error fetching selected questions:", err);
        });

      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}quiz/getoldquestions/${moduleid}`)
        .then((res) => {
          setAllQuestions(res.data.questions); // Populate all available questions
        })
        .catch((err) => {
          console.error("Error fetching all questions:", err);
        });
    }
  }, [moduleid]);

  // Handle remove question
  const handleRemoveQuestion = (id) => {
    const updatedSelected = selectedQuestions.filter(
      (question) => question.id !== id
    );
    setSelectedQuestions(updatedSelected);
  };

  // Handle add question
  const handleAddQuestion = (id) => {
    const questionToAdd = allQuestions.find((question) => question.id === id);
    if (questionToAdd && !selectedQuestions.some((q) => q.id === id)) {
      setSelectedQuestions([...selectedQuestions, questionToAdd]);
    }
  };

  // Handle submit updated questions to API
  const handleSubmit = () => {
    const updatedQuestionIds = selectedQuestions.map((q) => q.id);

    console.log(moduleid, updatedQuestionIds);

    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}quiz/updatequestionids`, {
        moduleid,
        questionIds: updatedQuestionIds,
      })
      .then((res) => {
        console.log(res);

        if (res.data.error === "No records found for the given moduleid.") {
          alert("No records found for the given module");
        } else if (res.data.error === "Failed to update records.") {
          alert("try again");
        } else if (res.data.message === "Question IDs updated successfully.") {
          alert("Questions updated successfully!");
        }
      })
      .catch((err) => {
        console.error("Error submitting updated questions:", err);
        alert("Failed to update questions. Please try again.");
      });
  };

  return (
    <div className="container">
      <h3 className="text-center">Question Bank Update</h3>
<div className="modpart p-2">
      {/* Module Selection */}
      <div className="form-group py-2">
        <div className="form-group-inner">
        <label htmlFor="module-select">Select Module</label>
        <select
          id="module-select"
          value={moduleid}
          className="fc1 w-100"
          onChange={(e) => setModuleId(e.target.value)}>
          <option value="">Select a Module</option>
          {module.map((mod) => (
            <option key={mod.moduleid} value={mod.moduleid}>
              {mod.modulename}
            </option>
          ))}
        </select>
      </div>
      </div>
      {/* Table for Selected Questions */}
      <h4>Selected Questions</h4>
      {selectedQuestions.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedQuestions.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td>
                <td dangerouslySetInnerHTML={{ __html: question.text }}></td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveQuestion(question.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No questions selected.</p>
      )}

      {/* Table for All Questions */}
      <h4>Available Questions</h4>
      {allQuestions.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allQuestions.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td>
                <td dangerouslySetInnerHTML={{ __html: question.text }}></td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleAddQuestion(question.id)}
                    disabled={selectedQuestions.some(
                      (q) => q.id === question.id
                    )}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No available questions.</p>
      )}

      {/* Submit Button */}
      {moduleid && (
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={selectedQuestions.length === 0}
        >
          Submit Updates
        </button>
      )}
    </div>
    </div>
  );
}

export default QuestionBankUpdate;
