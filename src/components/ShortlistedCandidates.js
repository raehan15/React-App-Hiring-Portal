import React, { useState, useEffect, navigate } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ShortlistedCandidates.css";
import { Link, useNavigate } from "react-router-dom";

const ShortlistedCandidates = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [domainData, setDomainData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    // Fetch candidates data from local storage
    const data = JSON.parse(localStorage.getItem("userData")) || [];
    const shortlistedData = data.filter((candidate) => candidate.shortlisted);
    setCandidates(shortlistedData);
    setFilteredCandidates(shortlistedData); // Set filteredCandidates to initial candidates data

    // Calculate domain data for bar chart
    const domainCount = shortlistedData.reduce((acc, candidate) => {
      acc[candidate.domain] = (acc[candidate.domain] || 0) + 1;
      return acc;
    }, {});

    setDomainData(domainCount);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = candidates.filter((candidate) => {
        const candidateDate = new Date(candidate.timestamp); // Parse the timestamp
        const fromDate = dateRange.from ? new Date(dateRange.from) : null;
        const toDate = dateRange.to ? new Date(dateRange.to) : null;

        console.log(`Candidate Date: ${candidateDate}`);
        console.log(`From Date: ${fromDate}`);
        console.log(`To Date: ${toDate}`);

        const matchesQuery =
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.domain.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDateRange =
          (!fromDate || candidateDate >= fromDate) &&
          (!toDate || candidateDate <= toDate);

        return matchesQuery && matchesDateRange;
      });

      setFilteredCandidates(filtered);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, dateRange, candidates]);

  const handleDelete = (id) => {
    const updatedCandidates = candidates.filter(
      (candidate) => candidate.id !== id
    );
    setCandidates(updatedCandidates);
    setFilteredCandidates(updatedCandidates);

    const allCandidates = JSON.parse(localStorage.getItem("userData")) || [];
    const updatedAllCandidates = allCandidates.map((candidate) => {
      if (candidate.id === id) {
        return { ...candidate, shortlisted: false };
      }
      return candidate;
    });

    localStorage.setItem("userData", JSON.stringify(updatedAllCandidates));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
  };

  const handleShowInfo = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleDownloadAll = () => {
    candidates.forEach((candidate) => {
      if (candidate.resume) {
        const link = document.createElement("a");
        link.href = candidate.resume.data;
        link.download = candidate.resume.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const handleDeleteAll = () => {
    const allCandidates = JSON.parse(localStorage.getItem("userData")) || [];
    const updatedAllCandidates = allCandidates.map((candidate) => ({
      ...candidate,
      shortlisted: false,
    }));
    setCandidates([]);
    setFilteredCandidates([]);
    localStorage.setItem("userData", JSON.stringify(updatedAllCandidates));
  };

  const barData = {
    labels: Object.keys(domainData),
    datasets: [
      {
        label: "Shortlisted Candidates",
        data: Object.values(domainData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="shortlisted-candidates">
      <h2>Shortlisted Candidates</h2>
      <div className="chart-container">
        <Bar data={barData} />
      </div>
      <div className="table-controls">
        <button className="table-button" onClick={handleDownloadAll}>
          Download All Resumes
        </button>
        <button className="table-button" onClick={handleDeleteAll}>
          Delete All Candidates
        </button>
        <div className="search-container">
          <label className="filter-label">
            From
            <input
              className="filter-box"
              type="date"
              placeholder="From"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, from: e.target.value }))
              }
            />
          </label>
          <label className="filter-label">
            To
            <input
              className="filter-box"
              type="date"
              placeholder="To"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, to: e.target.value }))
              }
            />
          </label>
          <input
            className="filter-box"
            type="text"
            placeholder="Name/Domain"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Resume</th>
            <th>Actions</th>
            <th>Show Info</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.domain}</td>
              <td>
                {candidate.resume ? (
                  <a
                    href={candidate.resume.data}
                    download={candidate.resume.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.resume.name}
                  </a>
                ) : (
                  "No Resume"
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(candidate.id)}>
                  Delete
                </button>
              </td>
              <td>
                <span
                  className="show-info"
                  onClick={() => handleShowInfo(candidate)}
                >
                  Show Info
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div class="last-row">
        <Link to="/admin/workflow">View All Candidates</Link>
        <button class="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Modal show={modalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Candidate Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCandidate && (
            <>
              <h3>Personal Info</h3>
              <p>
                <strong>Name:</strong> {selectedCandidate.name}
              </p>
              <p>
                <strong>Domain:</strong> {selectedCandidate.domain}
              </p>
              <p>
                <strong>Contact No:</strong> {selectedCandidate.contact}
              </p>
              <p>
                <strong>Email:</strong> {selectedCandidate.email}
              </p>
              <p>
                <strong>Current Address:</strong> {selectedCandidate.address}
              </p>

              <h3>Educational Background</h3>
              <p>
                <strong>Discipline:</strong> {selectedCandidate.discipline}
              </p>
              <p>
                <strong>Graduation Year:</strong>{" "}
                {selectedCandidate.graduationYear}
              </p>
              <p>
                <strong>University:</strong> {selectedCandidate.university}
              </p>

              <h3>Technical Background</h3>
              <p>
                <strong>The Languages Candidate Has Worked With:</strong>{" "}
                {selectedCandidate.languages.join(", ")}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShortlistedCandidates;
