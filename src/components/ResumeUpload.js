import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeUpload.css";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage("Please upload a PDF file.");
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = {
          name: file.name,
          data: reader.result,
        };
        localStorage.setItem("tempResume", JSON.stringify(fileData));
        navigate("/user/form");
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage("No file selected.");
    }
  };

  return (
    <div className="resume-upload">
      <h2>Upload Your Resume</h2>
      <div className="upload-container">
        <div className="upload-box">
          <input type="file" onChange={handleFileChange} />
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Drag & Drop File to Upload or Browse</p>
          )}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        <div className="buttons">
          <button onClick={() => setFile(null)}>Cancel</button>
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
