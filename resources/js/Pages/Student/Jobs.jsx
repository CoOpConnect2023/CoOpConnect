import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./Components/NavBar";

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



    const [jobs, setJobs] = useState([]);
    const [userId, setUserId] = useState(null);
    const [featuredJob, setFeaturedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocation, setLocation] = useState('');

    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

        // Function to fetch the user ID
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`/api/user-id`);
                setUserId(response.data.user_id);
                console.log('Fetched User ID:', userId);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId === null) {
            return;
        }


        const fetchJobs = async () => {
            try {
                const response = await axios.get(`/api/jobs`, {
                    params: {

                    }
                });
                const receivedJobs = response.data.slice(0, 3);
                setJobs(receivedJobs);
                console.log("jobs", response.data);


                if (receivedJobs.length > 0) {
                    setFeaturedJob(receivedJobs[0]);
                    console.log(receivedJobs[0])
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, [userId]);

    const handleSearch = async (e) => {
        e.preventDefault();


        const lowerCaseSearchTerm = searchTerm ? searchTerm.toLowerCase() : null;
        const lowerCaseSearchLocation = searchLocation ? searchLocation.toLowerCase() : null;

        console.log("Search Parameters:", { lowerCaseSearchTerm, lowerCaseSearchLocation });

        try {
            const response = await axios.get(`/api/jobs/search/${userId}`, {
                params: {
                    searchTerm: lowerCaseSearchTerm,
                    location: lowerCaseSearchLocation,
                }
            });

            setJobs(response.data);
            console.log("Jobs found:", response.data);
        } catch (error) {
            console.error("Error searching jobs:", error);
        }
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Job Titles, Keywords"
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
                    onChange={(e) => setLocation(e.target.value)}
                    aria-label="Location"
                />
            </SearchField>
            <SearchButton type="submit">View Jobs</SearchButton>
                        </SearchForm>{jobs && (
                        <JobList>{jobs && jobs.length > 0 ? (
                            <JobColumn>
                                {jobs.map((job) => (
                                    <JobCard key={job.title}>
                                        <JobTitle>{job.title}</JobTitle>
                                        <JobMeta>
                                            <div>{job.company}</div>
                                            <div>{job.location}</div>
                                        </JobMeta>
                                        <SkillsList>
                                {JSON.parse(job.skills).map((tag, index) => (
                                                <SkillBadge key={index}>{tag}</SkillBadge>
                                            ))}
                                </SkillsList>
                                        <JobDescription>
                                            {job.description}
                                        </JobDescription>
                                        <Divider />
                                        <ViewButton>VIEW POSTING</ViewButton>
                                    </JobCard>
                                ))}
                            </JobColumn>) : (
                <p>No jobs found.</p>
            )} {featuredJob && (
                            <FeaturedJob>
                                <JobCardFeatured>
                                    <JobTitle>{featuredJob.title}</JobTitle>
                                    <CompanyInfo>
                                        <CompanyImage
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8ae9cd831463a8906ed092974d8aff01723eb0ccd0c5c446d59bc3e96d9c74c?apiKey=d66532d056b14640a799069157705b77&"
                                            alt="company logo"
                                        />
                                        <CompanyDetails>
                                            <CompanyName>
                                                {featuredJob.title}
                                            </CompanyName>
                                            <CompanyLocation>
                                                {featuredJob.title}
                                            </CompanyLocation>
                                        </CompanyDetails>
                                    </CompanyInfo>
                                    <ApplyButton>Apply Here!</ApplyButton>

                                    <JobFullDescription>
                                        <strong>What is Lorem Ipsum?</strong>
                                        <br />
                                        {featuredJob.description}
                                        <br />
                                        <br />
                                        <strong>Why do we use it?</strong>
                                        <br />
                                        {featuredJob.title}
                                    </JobFullDescription>
                                </JobCardFeatured>
                            </FeaturedJob>)}
                        </JobList>)}
                    </SearchInnerContainer>
                </SearchContainer>
            </MainContainer>
        </NavBar>
    );
}

const MainContainer = styled.main`
    align-self: stretch;
    display: flex;
    flex-direction: column;
`;

const SearchContainer = styled.section`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    padding: 20px 10px 0;

    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

const SearchInnerContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1088px;
    flex-direction: column;
    align-items: center;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const SubHeading = styled.h2`
    color: #6b538c;
    font: 700 32px Poppins, sans-serif;
`;

const TextDescription = styled.p`
    color: #7b757f;
    margin-top: 10px;
    font: 700 24px/133% Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const SearchForm = styled.form`
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(123, 117, 127, 1);
    display: flex;
    margin-top: 30px;
    gap: 20px;
    font-size: 16px;
    color: #7b757f;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 150%;
    padding: 10px;

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const SearchField = styled.div`
    justify-content: center;
    display: flex;
    gap: 10px;
`;

const SearchInput = styled.input`
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid rgba(107, 83, 140, 1);
    background-color: #fff;
    padding: 8px 16px;
`;

const SearchButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: #6b538c;
    color: #fff;
    padding: 8px 16px;
`;

const JobList = styled.div`
    display: flex;
    margin-top: 5vh;
    margin-bottom: 5vh;
    padding: 10px 10px 0;
    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobColumn = styled.div`
    display: flex;
    flex-direction: column;
    line-height: normal;
    width: 43%;
    gap: 10px;
    max-height: 50vh; /* Adjust the height as needed */
    overflow-y: auto;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    @media (max-width: 991px) {
        width: 100%;
    }
`;

const JobCard = styled.article`
    max-width: 400px;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(107, 83, 140, 1);
    background-color: #eddcff;
    display: flex;

    width: 100%;
    flex-direction: column;
    padding: 20px 40px;

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const JobTitle = styled.h3`
    display: flex;
    font: 28px/129% Poppins, sans-serif;
`;

const JobMeta = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
`;

const JobTags = styled.div`
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    display: flex;
    margin-top: 17px;
    gap: 10px;
    font-size: 12px;
    color: #773dc3;
    font-weight: 400;
    letter-spacing: 0.4px;
    line-height: 133%;
`;

const Tag = styled.span`
    font-family: Poppins, sans-serif;
    justify-content: center;
    border-radius: 40px;
    border: 1px solid rgba(119, 61, 195, 1);
    padding: 8px 10px;
`;

const JobDescription = styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    align-self: stretch;
    text-align: center;
    text-overflow: ellipsis;
    letter-spacing: 0.25px;
    margin-top: 15px;
    font: 400 14px/20px Poppins, sans-serif;
`;

const Divider = styled.hr`
    border-color: rgba(38, 14, 68, 1);
    border-top: 1px solid;
    background-color: #260e44;
    margin-top: 14px;
    width: 86px;
`;

const ViewButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 12px;
    background-color: #6b538c;
    margin-top: 15px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 8px 16px;
`;

const FeaturedJob = styled.div`
    display: flex;
    flex-direction: column;
    align-items: self-end;
    line-height: normal;
    width: 57%;
    margin-left: 20px;

    @media (max-width: 991px) {
        width: 100%;
        margin-left: 0;
    }
`;

const JobCardFeatured = styled.article`
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 2px solid rgba(107, 83, 140, 1);
    background-color: #eddcff;
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px 40px;
    margin-bottom: 10px;
    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const CompanyImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 10px;
`;

const CompanyInfo = styled.div`
    display: flex;
    margin-top: 10px;
    gap: 20px;
    letter-spacing: 0.15px;
`;

const CompanyDetails = styled.div`
    display: flex;
    align-self: start;
    flex-direction: column;
`;

const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
`;

const CompanyLocation = styled.p`
    font-family: Poppins, sans-serif;
`;

const ApplyButton = styled.button`
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    font-family: Roboto, sans-serif;
    border-radius: 12px;
    background-color: #6b538c;
    margin-top: 10px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
    line-height: 24px;
    font-style: normal;
    font-size: 16px;
    width: 26%;
`;

const JobFullDescription = styled.p`
    max-width: 550px;
    padding-top: 11px;
    border-top: 1px solid rgba(0, 0, 0, 1);
    align-self: stretch;
    margin-top: 15px;
    color: #000;
    letter-spacing: 0.25px;
    font: 400 14px/20px Poppins, sans-serif;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const SkillsList = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-self: stretch;
    flex-wrap: wrap;
    margin-top: 17px;
    gap: 10px;
    font-size: 12px;
    color: #773dc3;
    letter-spacing: 0.4px;
    line-height: 133%;

    @media (max-width: 991px) {
        white-space: initial;
    }
`;

const SkillBadge = styled.span`
    font-family: Poppins, sans-serif;
    border: 1px solid #773dc3;
    border-radius: 40px;
    padding: 8px 10px;
    text-align: center;

    &:nth-child(4) {
        background-color: #773dc3;
        color: #fff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
`;

export default Jobs;
