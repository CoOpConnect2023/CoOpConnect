import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "@inertiajs/react";
import NavBar from "./Components/NavBar";
import JobModal from "../Profile/Partials/ViewJobModal";
import {
    getJobs,
    selectJobs,
    selectJobsStatus,
    selectJob,
    getJobsforUser,
    getUsersForJob,
    searchJobsbySkill,
    searchJobsBySkillAndLocation,
    postJob,
    putJob,
    patchJob,
    deleteJob,
} from "@/Features/jobs/jobsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
const appUrl = import.meta.env.VITE_APP_URL;
import { useSelector, useDispatch } from "react-redux";
import {
    MainContainer,
    SearchContainer,
    SearchInnerContainer,
    SubHeading,
    TextDescription,
    SearchForm,
    SearchField,
    SearchInput,
    SearchButton,
    JobList,
    JobColumn,
    JobCard,
    JobTitle,
    JobMeta,
    JobTags,
    Tag,
    JobDescription,
    Divider,
    ViewButton,
    FeaturedJob,
    JobCardFeatured,
    CompanyImage,
    CompanyInfo,
    CompanyDetails,
    CompanyName,
    CompanyLocation,
    ApplyButton,
    JobFullDescription,
    SkillsList,
    SkillBadge,
    FeaturedJobandList,
    SearchIcon,
    LocationIcon
} from "./Styling/Jobs.styles";

function Jobs() {
    const jobPostings = [
        {
            title: "Full-Stack Developer",
            company: "Microsoft",
            location: "Toronto, ON",
            tags: ["Javascript", "HTML", "Development", "+3"],
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
        {
            title: "Web Developer",
            company: "Atlassian",
            location: "Houston, TX",
            tags: ["Javascript", "HTML", "Development", "+3"],
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
    ];

    const [userId, setUserId] = useState(null);
    const [featuredJob, setFeaturedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchLocation, setLocation] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const dispatch = useDispatch();
    const jobs = useSelector(selectJobs);
    const jobsStatus = useSelector(selectJobsStatus);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];
        axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;

        // Function to fetch the user ID
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/user-id`);
                setUserId(response.data.user.id);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);

    useEffect(() => {
        if (jobs.length > 0) {
            setFeaturedJob(jobs[0]);
        }
    }, [jobs]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(
                searchJobsBySkillAndLocation({
                    searchTerm: searchTerm
                        .split(",")
                        .map((searchTerm) => searchTerm.trim()),
                    location: searchLocation,
                })
            );
            setFeaturedJob(response.payload[0]); // Assuming payload is an array of jobs returned
        } catch (error) {
            console.error("Error searching jobs:", error);
            // Handle error state if necessary
        }
    };

    const openModal = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

    return (
        <NavBar header={"Job Postings"}>
            <MainContainer darkMode={darkMode} fontSize={fontSize}>

                <SearchContainer darkMode={darkMode} fontSize={fontSize}>
                    <SearchInnerContainer darkMode={darkMode} fontSize={fontSize}>
                        <SubHeading darkMode={darkMode} fontSize={fontSize}>Search for Job Postings</SubHeading>
                        <TextDescription darkMode={darkMode} fontSize={fontSize}>
                            Get amazing opportunities through jobs at CO-OP
                            Connect!
                        </TextDescription>
                        <SearchForm darkMode={darkMode} fontSize={fontSize} onSubmit={handleSearch}>
                            <SearchField darkMode={darkMode} fontSize={fontSize}>
                            <SearchIcon icon={faSearch} darkMode={darkMode} fontSize={fontSize} />
                                <SearchInput darkMode={darkMode} fontSize={fontSize}
                                    type="text"
                                    placeholder="Job Titles, Keywords"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    aria-label="Job Titles, Keywords"
                                    data-test-id="search-field-input"
                                />
                            </SearchField>
                            <SearchField darkMode={darkMode} fontSize={fontSize}>
                            <LocationIcon icon={faMapMarkerAlt} darkMode={darkMode} fontSize={fontSize} />
                                <SearchInput darkMode={darkMode} fontSize={fontSize}
                                    type="text"
                                    value={searchLocation}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    aria-label="Location"
                                />
                            </SearchField>
                            <SearchButton darkMode={darkMode} fontSize={fontSize} type="submit">View Jobs</SearchButton>
                        </SearchForm>

                        <FeaturedJobandList darkMode={darkMode} fontSize={fontSize}>
                        {jobs && jobs.length > 0 ? (
                            <JobList darkMode={darkMode} fontSize={fontSize}>

{featuredJob && (
    <FeaturedJob darkMode={darkMode} fontSize={fontSize}>
        <JobCardFeatured darkMode={darkMode} fontSize={fontSize}>
            <JobTitle darkMode={darkMode} fontSize={fontSize}>
                {featuredJob.title}
            </JobTitle>
            <CompanyInfo darkMode={darkMode} fontSize={fontSize}>
                <CompanyImage darkMode={darkMode} fontSize={fontSize}
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8ae9cd831463a8906ed092974d8aff01723eb0ccd0c5c446d59bc3e96d9c74c?apiKey=d66532d056b14640a799069157705b77&"
                    alt="company logo"
                />
                <CompanyDetails darkMode={darkMode} fontSize={fontSize}>
                    <CompanyName darkMode={darkMode} fontSize={fontSize}>
                        {featuredJob.company}
                    </CompanyName>
                    <CompanyLocation darkMode={darkMode} fontSize={fontSize}>
                        {featuredJob.location}
                    </CompanyLocation>
                </CompanyDetails>
            </CompanyInfo>

            {/* Skills Section */}
            <SkillsList darkMode={darkMode} fontSize={fontSize}>
                {featuredJob.skills && featuredJob.skills.length > 0 ? (
                    featuredJob.skills.map((skill, index) => (
                        <SkillBadge darkMode={darkMode} fontSize={fontSize} key={index}>
                            {skill}
                        </SkillBadge>
                    ))
                ) : (
                    <p>No skills listed.</p>
                )}
            </SkillsList>

            <Link darkMode={darkMode} fontSize={fontSize} href={`/student/viewpost/${featuredJob.id}`}>
                <ApplyButton darkMode={darkMode} fontSize={fontSize}>
                    Apply Here!
                </ApplyButton>
            </Link>

            <JobFullDescription darkMode={darkMode} fontSize={fontSize}>
                <strong>Job Description</strong>
                <br />
                {featuredJob.description}
                <br />
                <br />
                <strong>Job Title</strong>
                <br />
                {featuredJob.title}
            </JobFullDescription>
        </JobCardFeatured>
    </FeaturedJob>
)}
                            </JobList>
                        ) : (
                            <p>No jobs found.</p>
                        )}</FeaturedJobandList>
                    </SearchInnerContainer>
                </SearchContainer>
                <JobColumn darkMode={darkMode} fontSize={fontSize}>
                                    {jobs.map((job) => (
                                        <JobCard darkMode={darkMode} fontSize={fontSize} key={job.title}>
                                            <JobTitle darkMode={darkMode} fontSize={fontSize}>{job.title}</JobTitle>
                                            <JobMeta darkMode={darkMode} fontSize={fontSize}>
                                                <div>{job.company}</div>
                                                <div>{job.location}</div>
                                            </JobMeta>
                                            <SkillsList darkMode={darkMode} fontSize={fontSize}>
                                                {job.skills.map(
                                                    (tag, index) => (
                                                        <SkillBadge key={index}>
                                                            {tag}
                                                        </SkillBadge>
                                                    )
                                                )}
                                            </SkillsList>
                                            <JobDescription darkMode={darkMode} fontSize={fontSize}>
                                                {job.description}
                                            </JobDescription>
                                            <Divider darkMode={darkMode} fontSize={fontSize} />
                                            <Link darkMode={darkMode} fontSize={fontSize} href={`/student/viewpost/${job.id}`}>   <ViewButton darkMode={darkMode} fontSize={fontSize}>
                                                VIEW POSTING
                                            </ViewButton></Link>
                                        </JobCard>
                                    ))}
                                </JobColumn>
            </MainContainer>
            {showModal && <JobModal darkMode={darkMode} fontSize={fontSize} job={selectedJob} onClose={closeModal} />}
        </NavBar>
    );
}

export default Jobs;
