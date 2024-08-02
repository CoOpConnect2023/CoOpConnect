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
    FeaturedJobandList
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
            <MainContainer>
                <SearchContainer>
                    <SearchInnerContainer>
                        <SubHeading>Search for Job Postings</SubHeading>
                        <TextDescription>
                            Get amazing opportunities through jobs at CO-OP
                            Connect!
                        </TextDescription>
                        <SearchForm onSubmit={handleSearch}>
                            <SearchField>
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ac6f5e8995015505b63112c3fe0ce83293960aae84ac26f166dcf6eb5607efc?apiKey=d66532d056b14640a799069157705b77&"
                                    alt="search icon"
                                />
                                <SearchInput
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
                            <SearchField>
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e18a12a75f61520eab005b610b7b3ed410f4b0e7ebaa3f2d7c7708f36f9bb18d?apiKey=d66532d056b14640a799069157705b77&"
                                    alt="location icon"
                                />
                                <SearchInput
                                    type="text"
                                    value={searchLocation}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    aria-label="Location"
                                />
                            </SearchField>
                            <SearchButton type="submit">View Jobs</SearchButton>
                        </SearchForm>

                        <FeaturedJobandList>
                        {jobs && jobs.length > 0 ? (
                            <JobList>
                                <JobColumn>
                                    {jobs.map((job) => (
                                        <JobCard key={job.title}>
                                            <JobTitle>{job.title}</JobTitle>
                                            <JobMeta>
                                                <div>{job.company}</div>
                                                <div>{job.location}</div>
                                            </JobMeta>
                                            <SkillsList>
                                                {job.skills.map(
                                                    (tag, index) => (
                                                        <SkillBadge key={index}>
                                                            {tag}
                                                        </SkillBadge>
                                                    )
                                                )}
                                            </SkillsList>
                                            <JobDescription>
                                                {job.description}
                                            </JobDescription>
                                            <Divider />
                                            <Link href={`/student/viewpost/${job.id}`}>   <ViewButton>
                                                VIEW POSTING
                                            </ViewButton></Link>
                                        </JobCard>
                                    ))}
                                </JobColumn>
                                {featuredJob && (
                                    <FeaturedJob>
                                        <JobCardFeatured>
                                            <JobTitle>
                                                {featuredJob.title}
                                            </JobTitle>
                                            <CompanyInfo>
                                                <CompanyImage
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8ae9cd831463a8906ed092974d8aff01723eb0ccd0c5c446d59bc3e96d9c74c?apiKey=d66532d056b14640a799069157705b77&"
                                                    alt="company logo"
                                                />
                                                <CompanyDetails>
                                                    <CompanyName>
                                                        {featuredJob.company}
                                                    </CompanyName>
                                                    <CompanyLocation>
                                                        {featuredJob.location}
                                                    </CompanyLocation>
                                                </CompanyDetails>
                                            </CompanyInfo>
                                            <Link href={`/student/viewpost/${featuredJob.id}`}>
                                            <ApplyButton>
                                                Apply Here!
                                            </ApplyButton></Link>
                                            <JobFullDescription>
                                                <strong>
                                                    What is Lorem Ipsum?
                                                </strong>
                                                <br />
                                                {featuredJob.description}
                                                <br />
                                                <br />
                                                <strong>
                                                    Why do we use it?
                                                </strong>
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
            </MainContainer>
            {showModal && <JobModal job={selectedJob} onClose={closeModal} />}
        </NavBar>
    );
}

export default Jobs;
