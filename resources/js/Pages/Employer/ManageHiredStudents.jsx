import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getUserJobsByUserId, selectUserJobs, deleteUserJob, editHiredStudent, postUserJob } from "@/Features/userJobs/userJobsSlice";
import { selectJobs, getJobsforUser, getJobsforEmployer } from "@/Features/jobs/jobsSlice";
import { selectUser, getStudents, selectAllStudents } from "@/Features/users/userSlice";
import { MainContainer, Section, SectionTitle, StyledTable, LoadingScreen } from "../Teacher/Styling/ManageStudents.styles";
import StudentDetailsModal from "./Components/StudentDetailsModal";

// Styled components
const LargeButton = styled.button`
  padding: 0.5em 1.5em;
  font-size: 1.2em;
  background-color: #B7A1E5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RedButton = styled(LargeButton)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;
const Input = styled.input`
  padding: 0.5em;
  font-size: 1.1em;
  width: 100%;
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#ccc")}; /* Darker border for dark mode */
  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")}; /* Dark background for dark mode */
  color: ${({ darkMode }) => (darkMode ? "#f5f5f5" : "#2C2C2C")}; /* Lighter text for dark mode, darker for light mode */
  border-radius: 4px;
  margin-bottom: 10px;

  &:focus {
    border-color: ${({ darkMode }) => (darkMode ? "#D6BCFA" : "#B7A1E5")}; /* Adjusted focus border color for dark mode */
    outline: none;
  }

  &::placeholder {
    color: ${({ darkMode }) => (darkMode ? "#888" : "#aaa")}; /* Placeholder color for better contrast */
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const DropdownItems = styled.div`
  position: absolute;
  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")}; /* Dark background for dark mode */
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#ccc")}; /* Adjust border for dark mode */
  border-radius: 4px;
  z-index: 1;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ darkMode, isHighlighted }) =>
    isHighlighted ? (darkMode ? "#444" : "#eee") : darkMode ? "#333" : "#fff"}; /* Highlighted and normal backgrounds for dark mode */

  color: ${({ darkMode }) => (darkMode ? "#f5f5f5" : "#2C2C2C")}; /* Adjust text color for dark mode */

  &:hover {
    background-color: ${({ darkMode }) => (darkMode ? "#555" : "#ddd")}; /* Adjust hover background color for dark mode */
  }
`;

const TableHeader = styled.th`
  cursor: pointer;
  position: relative;
  text-align: left;

  &::after {
    content: '${({ sortDirection }) => (sortDirection === 'asc' ? '▲' : sortDirection === 'desc' ? '▼' : '')}';
    position: absolute;
    right: 10px;
  }
`;

function HiredStudentsPage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const jobs = useSelector(selectJobs);
  const students = useSelector(selectAllStudents);
  const hiredStudents = useSelector(selectUserJobs);
  const darkMode = useSelector(state => state.accessibility.darkMode);
  const fontSize = useSelector(state => state.accessibility.textSize);

  const [loading, setLoading] = useState(true);
  const [editStudentId, setEditStudentId] = useState(null);
  const [hiredStudentsState, setHiredStudentsState] = useState([]);
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [showJobSuggestions, setShowJobSuggestions] = useState(false);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    startDate: '',
    endDate: ''
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [originalStudentData, setOriginalStudentData] = useState({});

  const statusOptions = ['Hired', 'Pending', 'Interviewing', 'Rejected'];

  useEffect(() => {
    const fetchHiredStudents = async () => {
      try {
        const response = await dispatch(getUserJobsByUserId(user.id)).unwrap();
        setHiredStudentsState(response);

        const jobsResponse = await dispatch(getJobsforEmployer({ userId: user.id })).unwrap();
        const studentsResponse = await dispatch(getStudents()).unwrap();

        setJobSuggestions(jobsResponse.map(job => job.title));
        setEmailSuggestions(studentsResponse.map(student => student.email));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    if (user?.id) {
      fetchHiredStudents();
    }
  }, [dispatch, user?.id]);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setHiredStudentsState(prevStudents =>
      prevStudents.map(student =>
        student.id === id
          ? {
              ...student,
              job: {
                ...student.job,
                [name]: value,
              },
              [name === 'status' ? 'status' : name]: value,
            }
          : student
      )
    );
  };

  const handleSuggestionSelect = (name, value) => {
    setNewStudent(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'position') setShowJobSuggestions(false); // Hide job suggestions after selecting
    if (name === 'email') setShowEmailSuggestions(false); // Hide email suggestions after selecting
  };

  const handleDateChange = (e, name, id) => {
    setHiredStudentsState(prevStudents =>
      prevStudents.map(student =>
        student.id === id
          ? {
              ...student,
              job: {
                ...student.job,
                [name]: e.target.value,
              },
            }
          : student
      )
    );
  };

  const handleInputFocus = (field) => {
    if (field === 'job') setShowJobSuggestions(true);
    if (field === 'email') setShowEmailSuggestions(true);
  };

  const handleEditHiredStudent = async (id) => {
    const student = hiredStudentsState.find(s => s.id === id);
    try {
      await dispatch(
        editHiredStudent({
          userJobsId: student.id,
          email: student.user.email,
          jobTitle: student.job.title,
          startDate: student.job.start_date,
          endDate: student.job.end_date,
          status: student.status
        })
      ).unwrap();
      setEditStudentId(null);
    } catch (error) {
      console.error("Error editing hired student:", error);
    }
  };

  const handleEditClick = (id) => {
    const studentToEdit = hiredStudentsState.find(s => s.id === id);
    setEditStudentId(id);

    // Store a backup of the original data
    setOriginalStudentData({
      ...originalStudentData,
      [id]: { ...studentToEdit }, // Save original student data for the given ID
    });
  };
  const handleDeleteStudent = async (id) => {
    try {
      await dispatch(deleteUserJob({userJobId:id})).unwrap();
      console.log(id)
      const updatedJobs = await dispatch(getUserJobsByUserId(user.id)).unwrap();

      // Update the hiredStudentsState with the new data
      setHiredStudentsState(updatedJobs);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  const handleAddStudent = async () => {
    try {
      // Fetch the selected jobId and userId based on the selected position and email
      const selectedJob = jobs.find(job => job.title === newStudent.position);
      const selectedStudent = students.find(student => student.email === newStudent.email);

      if (!selectedJob || !selectedStudent) {
        alert('Please select a valid job and student.');
        return;
      }

      // Post new userJob with userId, jobsId, and status "Hired"
      await dispatch(
        postUserJob({
          userId: selectedStudent.id,
          jobsId: selectedJob.id,
          status: 'Hired',
          startDate: newStudent.startDate,
          endDate: newStudent.endDate,
          resume: null,
        })
      ).unwrap();
      const updatedJobs = await dispatch(getUserJobsByUserId(user.id)).unwrap();

      // Update the hiredStudentsState with the new data
      setHiredStudentsState(updatedJobs);


      setNewStudent({ name: '', email: '', company: '', position: '', startDate: '', endDate: '' });


    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleViewClick = (studentId) => {
    const student = hiredStudentsState.find(s => s.id === studentId);
    setSelectedStudent(student); // Set the selected student for viewing
  }

  const closeModal = () => {
    setSelectedStudent(null); // Close the modal
  };



  const handleCancelClick = (id) => {
    // Revert the changes by replacing the edited data with the original
    const originalData = originalStudentData[id];
    setHiredStudentsState(prevState =>
      prevState.map(student => (student.id === id ? originalData : student))
    );

    setEditStudentId(null); // Exit edit mode
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = React.useMemo(() => {
    if (!sortConfig.key) return hiredStudentsState;
    return [...hiredStudentsState].sort((a, b) => {
      const aValue = sortConfig.key.split(".").reduce((obj, keyPart) => obj[keyPart], a);
      const bValue = sortConfig.key.split(".").reduce((obj, keyPart) => obj[keyPart], b);

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [hiredStudentsState, sortConfig]);


  return (
    <NavBar header={"Hired Students"}>
      <MainContainer fontSize={fontSize} darkMode={darkMode}>
        {loading ? (
          <LoadingScreen fontSize={fontSize} darkMode={darkMode}>
            Loading hired students, please wait...
          </LoadingScreen>
        ) : (
          <>
            <Section fontSize={fontSize} darkMode={darkMode}>
              <SectionTitle fontSize={fontSize} darkMode={darkMode}>
                Hired Students List
              </SectionTitle>
              <StyledTable fontSize={fontSize} darkMode={darkMode}>
                <thead>
                  <tr>
                  <TableHeader
            onClick={() => handleSort("user_id")}
            sortDirection={sortConfig.key === "user_id" ? sortConfig.direction : null}
          >
            Student ID
          </TableHeader>
          <TableHeader
            onClick={() => handleSort("user.name")}
            sortDirection={sortConfig.key === "user.name" ? sortConfig.direction : null}
          >
            Name
          </TableHeader>
          <TableHeader
            onClick={() => handleSort("user.email")}
            sortDirection={sortConfig.key === "user.email" ? sortConfig.direction : null}
          >
            Email
          </TableHeader>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>View Student</th>
                    <th>Edit/Save</th>
                    <th>Delete/Cancel</th>
                  </tr>
                </thead>
                <tbody>
                  {hiredStudentsState.length > 0 ? (
                    sortedStudents.map((student, index) => (
                      <tr key={index}>
                        <td>{student.user_id}</td>
                        <td>{student.user.name}</td>
                        <td>{student.user.email}</td>
                        <td>{student.job.company.name}</td>
                        <td>
                          {editStudentId === student.id ? (
                            <Dropdown>
                              <Input
                                name="jobTitle"
                                value={student.job.title}
                                onChange={(e) => handleInputChange(e, student.id)}
                                placeholder="Start typing job title..."
                                onFocus={() => handleInputFocus('job')}
                              />
                              {showJobSuggestions && (
                                <DropdownItems>
                                  {jobSuggestions
                                    .filter((job) =>
                                      job.toLowerCase().includes(student.job.title.toLowerCase())
                                    )
                                    .map((suggestion, idx) => (
                                      <DropdownItem
                                        key={idx}
                                        onClick={() =>
                                          handleSuggestionSelect("jobTitle", suggestion, student.id)
                                        }
                                      >
                                        {suggestion}
                                      </DropdownItem>
                                    ))}
                                </DropdownItems>
                              )}
                            </Dropdown>
                          ) : (
                            student.job.title || 'N/A'
                          )}
                        </td>
                        <td>
                          {editStudentId === student.id ? (
                            <Input
                              type="date"
                              name="startDate"
                              value={student.job.start_date}
                              onChange={(e) => handleDateChange(e, "start_date", student.id)}
                            />
                          ) : (
                            student.job.start_date || 'N/A'
                          )}
                        </td>
                        <td>
                          {editStudentId === student.id ? (
                            <Input
                              type="date"
                              name="endDate"
                              value={student.job.end_date}
                              onChange={(e) => handleDateChange(e, "end_date", student.id)}
                            />
                          ) : (
                            student.job.end_date || 'N/A'
                          )}
                        </td>
                        <td>
                          {editStudentId === student.id ? (
                            <Dropdown>
                              <select
                                name="status"
                                value={student.status}
                                onChange={(e) => handleInputChange(e, student.id)}
                              >
                                {statusOptions.map((status, idx) => (
                                  <option key={idx} value={status}>
                                    {status}
                                  </option>
                                ))}
                              </select>
                            </Dropdown>
                          ) : (
                            student.status || 'N/A'
                          )}
                        </td>
                        <td>

                            <LargeButton onClick={() => handleViewClick(student.id)}>
                              View
                            </LargeButton>

                        </td>
                        <td>
                          {editStudentId === student.id ? (
                            <LargeButton onClick={() => handleEditHiredStudent(student.id)}>
                              Save
                            </LargeButton>
                          ) : (
                            <LargeButton onClick={() => handleEditClick(student.id)}>
                              Edit
                            </LargeButton>
                          )}
                        </td>
                        <td>
                          {editStudentId === student.id ? (
                            <LargeButton onClick={() => handleCancelClick(student.id)}>
                            Cancel
                          </LargeButton>
                          ) : (
                            <RedButton onClick={() => handleDeleteStudent(student.id)}>
                              Delete
                            </RedButton>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        No hired students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </StyledTable>
            </Section>

            <Section fontSize={fontSize} darkMode={darkMode}>
              <SectionTitle fontSize={fontSize} darkMode={darkMode}>
                Add New Student
              </SectionTitle>
              <StyledTable fontSize={fontSize} darkMode={darkMode}>
                <tbody>
                  <tr>
                  <td>Position:</td>
                    <td>
                      <Dropdown>
                        <Input
                          name="position"
                          value={newStudent.position}
                          onChange={(e) => {
                            setNewStudent({ ...newStudent, position: e.target.value });
                            setShowJobSuggestions(e.target.value.length > 0);
                          }}
                          placeholder="Job Position..."
                        />
                        {showJobSuggestions && (
                          <DropdownItems>
                            {jobSuggestions
                              .filter((job) =>
                                job.toLowerCase().includes(newStudent.position.toLowerCase())
                              )
                              .map((suggestion, idx) => (
                                <DropdownItem
                                  key={idx}
                                  onClick={() => handleSuggestionSelect('position', suggestion)}
                                >
                                  {suggestion}
                                </DropdownItem>
                              ))}
                          </DropdownItems>
                        )}
                      </Dropdown>
                    </td>
                  </tr>
                  <tr>
                    <td>Student Email:</td>
                    <td>
                      <Dropdown>
                        <Input
                          name="email"
                          value={newStudent.email}
                          onChange={(e) => {
                            setNewStudent({ ...newStudent, email: e.target.value });
                            setShowEmailSuggestions(e.target.value.length > 0);
                          }}
                          placeholder="Student Email"
                        />
                        {showEmailSuggestions && (
                          <DropdownItems>
                            {emailSuggestions
                              .filter((email) =>
                                email.toLowerCase().includes(newStudent.email.toLowerCase())
                              )
                              .map((suggestion, idx) => (
                                <DropdownItem
                                  key={idx}
                                  onClick={() => handleSuggestionSelect('email', suggestion)}
                                >
                                  {suggestion}
                                </DropdownItem>
                              ))}
                          </DropdownItems>
                        )}
                      </Dropdown>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="2">
                      <LargeButton onClick={handleAddStudent}>
                        Add Student
                      </LargeButton>
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
            </Section>
          </>
        )}
      </MainContainer>

      {selectedStudent && (
        <StudentDetailsModal student={selectedStudent} onClose={closeModal} />
      )}
    </NavBar>
  );
}

export default HiredStudentsPage;
