import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useDropzone } from 'react-dropzone';
import { spin, ProfileWrapper, ProfileHeader, ProfileSection, ProfileContainer, ProfileImageWrapper, ProfileImage, ProfileBio, BioHeader, ProfileDetail, ProfileDetailItem, DetailLabel, DetailValue, EditProfileButton, ClearProfileButton, DropzoneContainer, SkillsContainer, SkillChip, AddSkillButton, LoadingScreen, Spinner, AutocompleteList, AutocompleteItem } from "../Styling/ProfileForm.styles";
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
                <SkillChip key={index} data-testid="skill-chip">
                  {skill}
                  <span style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => removeSkill(index)} data-testid="remove-skill">
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
              data-testid="skill-input"
            />
            <AddSkillButton type="button" onClick={addSkill} data-testid="add-skill-button">
              Add Skill
            </AddSkillButton>
          </SkillsContainer>
        </ProfileDetailItem>
        <ProfileDetailItem>
          <DetailLabel>Courses</DetailLabel>
          <SkillsContainer>
            {Array.isArray(user.courses) && user.courses.length > 0 ? (
              user.courses.map((course, index) => (
                <SkillChip key={index} data-testid={`course-${index}`}>
                  {course.name}
                  <span style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => removeCourse(index)} data-testid={`remove-course-${index}`}>
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
              data-testid="course-input"
            />
            {filteredCourses.length > 0 && (
              <AutocompleteList data-testid="autocomplete-list">
                {filteredCourses.map((course) => (
                  <AutocompleteItem key={course.id} onClick={() => handleCourseSelect(course)}>
                    {course.name}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
            )}

          </SkillsContainer>
        </ProfileDetailItem>
      </ProfileDetail>
      <EditProfileButton onClick={handleSubmit}>Save Profile Changes</EditProfileButton>
    </ProfileWrapper>
  );
};






export default ProfileForm;
