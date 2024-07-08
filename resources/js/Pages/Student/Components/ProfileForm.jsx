import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDropzone } from 'react-dropzone';
const appUrl = import.meta.env.VITE_APP_URL;



const Dropzone = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop a profile image here</p>
        </DropzoneContainer>
    );
};

const ProfileForm = () => {
    const [user, setUser] = useState(null);
    const [droppedImage, setDroppedImage] = useState(null);
    const [schools, setSchools] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [schoolQuery, setSchoolQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [courseQuery, setCourseQuery] = useState("");

    // Fetch user data on component mount
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${appUrl}/api/user-id/courses`);
          const userData = response.data.user;
          userData.skills = userData.skills || [];

          // Fetch school name if school_id exists
          if (userData.school_id) {
            const schoolResponse = await axios.get(
              `${appUrl}/api/v1/schools/${userData.school_id}`
            );
            userData.school = schoolResponse.data.data.name;
          } else {
            userData.school = "";
          }

          setUser(userData);

          // Fetch available courses for autocomplete
          const coursesResponse = await axios.get(
            `${appUrl}/api/v1/school/${userData.school_id}/courses`
          );
          setCourses(coursesResponse.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchSchools = async () => {
        try {
          const response = await axios.get(`${appUrl}/api/v1/schools`);
          setSchools(response.data.data);
        } catch (error) {
          console.error("Error fetching schools:", error);
        }
      };

      fetchUserData();
      fetchSchools();
    }, []);

    const handleCourseSelect = (course) => {
      setUser((prevData) => ({
        ...prevData,
        courses: [...prevData.courses, course],
        newCourse: "", // Clear input field after selection
      }));
      setFilteredCourses([]); // Clear filtered courses
    };

    const addCourse = (course) => {
      console.log("Adding course:", course); // Log course details

      setUser((prevData) => ({
        ...prevData,
        courses: [...prevData.courses, course.id],
        newCourse: "", // Clear input field after adding
      }));
    };

    const removeCourse = (index) => {
        const updatedCourses = [...user.courses];
        updatedCourses.splice(index, 1);
        setUser((prevData) => ({
          ...prevData,
          courses: updatedCourses,
        }));

        console.log("Updated Courses:", updatedCourses); // Log the updated courses array
      };

    const handleDrop = (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setDroppedImage(imageUrl);
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (name === "school") {
        setSchoolQuery(value);
        if (value.length > 1) {
          setFilteredSchools(
            schools.filter((school) =>
              school.name.toLowerCase().includes(value.toLowerCase())
            )
          );
        } else {
          setFilteredSchools([]);
        }
      } else if (name === "newCourse") {
        setCourseQuery(value);
        if (value.length > 1) {
          setFilteredCourses(
            courses.filter((course) =>
              course.name.toLowerCase().includes(value.toLowerCase())
            )
          );
        } else {
          setFilteredCourses([]);
        }
      }
    };

    const handleSchoolSelect = (school) => {
      setUser((prevData) => ({
        ...prevData,
        school: school.name,
        school_id: school.id,
      }));
      setFilteredSchools([]);
    };

    const handleSubmit = async () => {
      try {
        const formData = new FormData();

        if (droppedImage instanceof File) {
          formData.append("profile_image", droppedImage);
        } else if (typeof droppedImage === "string") {
          const response = await fetch(droppedImage);
          const blob = await response.blob();
          formData.append("profile_image", blob, "profile_image.png");
        }

        formData.append("description", user.description);
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("role", user.role);
        formData.append("school_id", user.school_id);
        formData.append("positiontitle", user.positiontitle);
        formData.append("skills", JSON.stringify(user.skills));

        const coursesData = user.courses.map((course) => ({
          id: course.id,
          name: course.name,
          startDate: course.startDate,
          endDate: course.endDate,
          teacherID: course.teacherID,
          schoolID: course.schoolID,
        }));
        formData.append("courses", JSON.stringify(coursesData));
console.log("coursedata", coursesData)
        const response = await axios.post(
          `${appUrl}/api/update-profile/${user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        console.log("Profile updated:", response.data);
        // You might handle state update instead of page reload
        window.location.reload(); // Reload page or handle state update as needed
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };

    const handleClear = () => {
      setUser({ ...user, profile_image: null });
    };

    const addSkill = () => {
        if (user.newSkill.trim() !== "") {
          setUser((prevData) => ({
            ...prevData,
            skills: [...prevData.skills, prevData.newSkill.trim()],
            newSkill: "", // Clear the input field after adding the skill
          }));
        }
      };

      const removeSkill = (index) => {
        const updatedSkills = [...user.skills];
        updatedSkills.splice(index, 1);
        setUser((prevData) => ({
          ...prevData,
          skills: updatedSkills,
        }));
      };

    if (!user) {
      return <LoadingScreen><Spinner/></LoadingScreen>;
    }

    return (
      <ProfileWrapper>
        <ProfileHeader>Edit Profile</ProfileHeader>
        <ProfileSection>
          <ProfileContainer>
            <ProfileImageWrapper>
              {droppedImage ? (
                <ProfileImage
                  loading="lazy"
                  src={droppedImage}
                  alt="Profile"
                />
              ) : user.profile_image ? (
                <div>
                  <ProfileImage
                    loading="lazy"
                    src={user.profile_image}
                    alt="Profile Image"
                  />
                  <ClearProfileButton onClick={handleClear}>
                    Clear
                  </ClearProfileButton>
                </div>
              ) : (
                <Dropzone onDrop={handleDrop} />
              )}
            </ProfileImageWrapper>
            <ProfileBio>
              <BioHeader>Bio:</BioHeader>
              <DetailValue
                name="description"
                value={user.description}
                onChange={handleChange}
                placeholder="Add a few words about yourself..."
              />
            </ProfileBio>
          </ProfileContainer>
        </ProfileSection>
        <ProfileDetail>
          <ProfileDetailItem>
            <DetailLabel>Full Name</DetailLabel>
            <DetailValue
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </ProfileDetailItem>
          <ProfileDetailItem>
            <DetailLabel>Email</DetailLabel>
            <DetailValue
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </ProfileDetailItem>
          <ProfileDetailItem>
            <DetailLabel>Account Type</DetailLabel>
            <DetailValue
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
            />
          </ProfileDetailItem>
          <ProfileDetailItem>
          <DetailLabel>Education Institute</DetailLabel>
          <DetailValue
            type="text"
            name="school"
            value={user.school}
            onChange={handleChange}
          />
          {filteredSchools.length > 0 && (
            <AutocompleteList>
              {filteredSchools.map((school) => (
                <AutocompleteItem key={school.id} onClick={() => handleSchoolSelect(school)}>
                  {school.name}
                </AutocompleteItem>
              ))}
            </AutocompleteList>
          )}
        </ProfileDetailItem>
        <ProfileDetailItem>
          <DetailLabel>Preferred Position Title</DetailLabel>
          <DetailValue
            type="text"
            name="positiontitle"
            value={user.positiontitle}
            onChange={handleChange}
          />
        </ProfileDetailItem>
        <ProfileDetailItem>
          <DetailLabel>Skills</DetailLabel>
          <SkillsContainer>
            {Array.isArray(user.skills) && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <SkillChip key={index}>
                  {skill}
                  <span style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => removeSkill(index)}>
                    &#10005;
                  </span>
                </SkillChip>
              ))
            ) : (
              <p>No skills added yet.</p>
            )}
            <DetailValue
              type="text"
              name="newSkill"
              value={user.newSkill || ''}
              onChange={handleChange}
              placeholder="Add a skill..."
            />
            <AddSkillButton type="button" onClick={addSkill}>
              Add Skill
            </AddSkillButton>
          </SkillsContainer>
        </ProfileDetailItem>
        <ProfileDetailItem>
          <DetailLabel>Courses</DetailLabel>
          <SkillsContainer>
            {Array.isArray(user.courses) && user.courses.length > 0 ? (
              user.courses.map((course, index) => (
                <SkillChip key={index}>
                  {course.name}
                  <span style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => removeCourse(index)}>
                    &#10005;
                  </span>
                </SkillChip>
              ))
            ) : (
              <p>No courses added yet.</p>
            )}
            <DetailValue
              type="text"
              name="newCourse"
              value={courseQuery}
              onChange={handleChange}
              placeholder="Add a course..."
            />
            {filteredCourses.length > 0 && (
              <AutocompleteList>
                {filteredCourses.map((course) => (
                  <AutocompleteItem key={course.id} onClick={() => handleCourseSelect(course)}>
                    {course.name}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
            )}
            <AddSkillButton type="button" onClick={() => addCourse(courseQuery)}>
              Add Course
            </AddSkillButton>
          </SkillsContainer>
        </ProfileDetailItem>
      </ProfileDetail>
      <EditProfileButton onClick={handleSubmit}>Save Profile Changes</EditProfileButton>
    </ProfileWrapper>
  );
};




const ProfileWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 300px; /* Set a minimum width */
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    gap: 40px;
    padding: 40px 30px;
`;
const ProfileHeader = styled.h1`
    color: #6b538c;
    text-decoration: underline;
    align-self: center;
    font-weight: 600;
    font-size: 32px;
    font-family: Poppins, sans-serif;
`;
const ProfileSection = styled.section`
    margin-top: 40px;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;
const ProfileContainer = styled.div`
    gap: 20px;
    display: flex;
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
    }
`;
const ProfileImageWrapper = styled.figure`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 26%;
    margin: 0 auto;
    @media (max-width: 991px) {
        width: 100%;
        margin-top: 20px;
    }
`;
const ProfileImage = styled.img`
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 2px solid rgba(45, 54, 72, 1);
    background-color: #edf0f7;
    display: block;





    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;
const ProfileBio = styled.div`
    display: flex;
    flex-direction: column;
    width: 74%;
    margin-left: 20px;
    @media (max-width: 991px) {
        width: 100%;
        margin-top: 20px;
    }
`;
const BioHeader = styled.h2`
    color: #2d3648;
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: 14px;
    font-family: Poppins, sans-serif;
`;
const BioContent = styled.div`
    border-radius: 10px;
    border: 2px solid #7b757f;
    background-color: #eedcff;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    white-space: pre-wrap; /* Ensures that whitespace is preserved and text wraps */
    word-wrap: break-word;
`;
const BioLine = styled.div`
    border-radius: 3px;
    background-color: #260e44;
    height: 16px;
    margin-top: 8px;
    &:first-child {
        margin-top: 0;
    }
`;
const BioStatus = styled.div`
    display: flex;
    margin-top: 8px;
    padding-right: 80px;
    gap: 0;
    @media (max-width: 991px) {
        padding-right: 20px;
    }
`;
const BioStatusItem = styled.div`
    border-radius: 3px;
    background-color: #260e44;
    height: 16px;
    flex: 1;
    &:first-child {
        border-radius: 3px 0 0 3px;
    }
    &:last-child {
        border-radius: 0 3px 3px 0;
    }
`;
const ProfileDetail = styled.section`
    margin-top: 20px;
`;
const ProfileDetailItem = styled.div`
    margin-top: 20px;
`;
const DetailLabel = styled.label`
    color: #6b538c;
    letter-spacing: 0.1px;
    font-weight: 500;
    font-size: 14px;
    font-family: Poppins, sans-serif;
`;
const DetailValue = styled.input`
    align-items: start;
    border-radius: 6px;
    border: 2px solid #260e44;
    background-color: #fff7ff;
    margin-top: 8px;
    color: #7b757f;
    letter-spacing: 0.25px;
    padding: 19px 12px;
    font-size: 14px;
    font-family: Poppins, sans-serif;
    line-height: 143%;
    width: 100%;
    box-sizing: border-box;
    white-space: pre-wrap; /* Ensures that whitespace is preserved and text wraps */
    word-wrap: break-word;
    @media (max-width: 991px) {
        max-width: 100%;
        padding-right: 20px;
    }
`;
const EditProfileButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(135deg, #6b538c, #a97bbf);
    align-self: start;
    margin-top: 20px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    font-family: Roboto, sans-serif;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #543b6f, #8e6aae);
        transform: scale(1.05);
    }
`;

const ClearProfileButton = styled.button`
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(135deg, #6b538c, #a97bbf);
    align-self: start;
    margin-top: 20px;
    color: #fff;
    letter-spacing: 0.5px;
    padding: 8px 16px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    font-family: Roboto, sans-serif;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, #543b6f, #8e6aae);
        transform: scale(1.05);
    }
`;


const DropzoneContainer = styled.div`
    border: 2px dashed #6b538c;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: #6b538c;
    font-family: Poppins, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.1px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f3e8ff;
    }
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const SkillChip = styled.div`
    background-color: #e0e0e0;
    color: #333;
    padding: 6px 12px;
    border-radius: 20px;
    margin-right: 8px;
    margin-bottom: 8px;
`;

const AddSkillButton = styled.button`
    background-color: #6b538c;
    color: #fff;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #7c4e7e;
    }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingScreen = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 20px;
    background-color: #f0f0f0;
    color: #333; 
`;


const Spinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spin} 1s linear infinite;
`;
const AutocompleteList = styled.ul`

  background-color: white;
  border: 1px solid #6b538c;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
  width: calc(100% - 20px);
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
`;

const AutocompleteItem = styled.li`
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;


export default ProfileForm;
