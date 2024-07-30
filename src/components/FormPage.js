import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadFile } from "../utils/downloadFile";
import "./FormPage.css";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    discipline: "",
    graduationYear: "",
    university: "",
    skills: "",
    languages: [],
  });
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddLanguage = () => {
    if (language && !formData.languages.includes(language)) {
      setFormData((prevData) => ({
        ...prevData,
        languages: [...prevData.languages, language],
      }));
      setLanguage("");
    }
  };

  const handleRemoveLanguage = (lang) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: prevData.languages.filter((l) => l !== lang),
    }));
  };

  const generateUniqueId = () => {
    return `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDomain = localStorage.getItem("selectedDomain");
    const uploadedResume = JSON.parse(localStorage.getItem("tempResume"));
    const userData = {
      id: generateUniqueId(), // Generate unique ID
      ...formData,
      domain: selectedDomain,
      resume: uploadedResume,
      timestamp: new Date().toISOString(), // Add timestamp when the form is submitted
    };

    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem("userData")) || [];
    existingData.push(userData);

    // Save updated data back to local storage
    localStorage.setItem("userData", JSON.stringify(existingData));
    localStorage.removeItem("tempResume");

    // Download the resume file
    if (uploadedResume && uploadedResume.data) {
      const resumeFile = new Blob([uploadedResume.data], {
        type: "application/pdf",
      });
      downloadFile(resumeFile, `${formData.name}_resume.pdf`);
    }

    navigate("/user/thank-you");
  };

  return (
    <div className="form-page">
      <h2>Fill the Form</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Info</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Current Address"
          />
        </div>
        <div className="form-section">
          <h3>Educational Background</h3>
          <input
            type="text"
            name="discipline"
            value={formData.discipline}
            onChange={handleChange}
            placeholder="Discipline"
          />
          <input
            type="text"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleChange}
            placeholder="Graduation Year"
          />
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University"
          />
        </div>
        <div className="form-section">
          <h3>Technical Background</h3>
          <div className="language-box">
            {formData.languages.map((lang, index) => (
              <span key={index} className="language-tag">
                {lang}{" "}
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(lang)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="" disabled>
              Select Language
            </option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="React">React</option>
            <option value="Angular">Angular</option>
          </select>
          <button type="button" onClick={handleAddLanguage}>
            Add
          </button>
        </div>
        <div className="buttons">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
