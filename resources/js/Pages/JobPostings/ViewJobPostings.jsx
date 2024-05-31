import * as React from "react";
import styled from "styled-components";

function JobPostingPage() {
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

    return (
        <PageWrapper>
            <Header>
                <Title>Job Postings</Title>
            </Header>
            <Content>
                <JobSearchSection>
                    <JobSearchTitle>Search for Job Postings</JobSearchTitle>
                    <JobSearchSubtitle>
                        Get amazing through jobs at CO-OP Connect!
                    </JobSearchSubtitle>
                    <JobSearchForm>
                        <FormField>
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ac6f5e8995015505b63112c3fe0ce83293960aae84ac26f166dcf6eb5607efc?apiKey=d66532d056b14640a799069157705b77&"
                                alt="Icon"
                            />
                            <label
                                htmlFor="jobKeywords"
                                className="visually-hidden"
                            >
                                Job Titles, Keywords
                            </label>
                            <JobSearchInput
                                id="jobKeywords"
                                placeholder="Job Titles, Keywords"
                                aria-label="Job Titles, Keywords"
                            />
                        </FormField>
                        <FormField>
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e18a12a75f61520eab005b610b7b3ed410f4b0e7ebaa3f2d7c7708f36f9bb18d?apiKey=d66532d056b14640a799069157705b77&"
                                alt="Icon"
                            />
                            <label
                                htmlFor="jobLocation"
                                className="visually-hidden"
                            >
                                Location
                            </label>
                            <JobSearchInput
                                id="jobLocation"
                                placeholder="Location"
                                aria-label="Location"
                            />
                        </FormField>
                        <SearchButton type="submit">View Jobs</SearchButton>
                    </JobSearchForm>
                </JobSearchSection>
                <JobList>
                    <JobListColumn>
                        {jobPostings.map((job, index) => (
                            <JobCard key={index}>
                                <JobTitle>{job.title}</JobTitle>
                                <CompanyName>{job.company}</CompanyName>
                                <Location>{job.location}</Location>
                                <Tags>
                                    {job.tags.map((tag, tIndex) => (
                                        <Tag key={tIndex}>{tag}</Tag>
                                    ))}
                                </Tags>
                                <JobDescription>
                                    {job.description}
                                </JobDescription>
                                <Separator />
                                <ViewPostingButton>
                                    VIEW POSTING
                                </ViewPostingButton>
                            </JobCard>
                        ))}
                        <Separator />
                    </JobListColumn>
                    <JobDetailsColumn>
                        <HighlightedJob>
                            <HighlightedJobTitle>
                                Full-Stack Developer
                            </HighlightedJobTitle>
                            <HighlightedJobHeader>
                                <HighlightedJobImage
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8ae9cd831463a8906ed092974d8aff01723eb0ccd0c5c446d59bc3e96d9c74c?apiKey=d66532d056b14640a799069157705b77&"
                                    alt="Company Logo"
                                />
                                <HighlightedJobInfo>
                                    <CompanyName>Microsoft</CompanyName>
                                    <Location>Toronto, ON</Location>
                                </HighlightedJobInfo>
                            </HighlightedJobHeader>
                            <ApplyButton>Apply Here!</ApplyButton>
                            <HighlightedJobDescription>
                                <strong>What is Lorem Ipsum?</strong> <br />{" "}
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum. <br /> <br />
                                <strong>Why do we use it?</strong> <br /> It is
                                a long established fact that a reader will be
                                distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using
                                'Content here, content here', making it look
                                like readable English. Many desktop publishing
                                packages and web page editors now use Lorem
                                Ipsum as their default model text, and a search
                                for 'lorem ipsum' will uncover many web sites
                                still in their infancy. Various versions have
                                evolved over the years, sometimes by accident,
                                sometimes on purpose (injected humour and the
                                like).
                            </HighlightedJobDescription>
                        </HighlightedJob>
                    </JobDetailsColumn>
                </JobList>
            </Content>
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 20px 0;
    align-self: stretch;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px;

    @media (max-width: 991px) {
        flex-wrap: wrap;
        max-width: 100%;
    }
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 600;
    color: #000;
    font-family: Poppins, sans-serif;
    line-height: 1.22;
`;

const Content = styled.main`
    display: flex;
    flex-direction: column;
    padding: 40px 20px 0;
    align-items: center;
`;

const JobSearchSection = styled.section`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 20px;
    margin-top: 40px;
    background-color: #fff;
    border-radius: 10px;
    max-width: 1088px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    @media (max-width: 991px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

const JobSearchTitle = styled.h2`
    font-size: 32px;
    font-weight: 700;
    color: #6b538c;
    font-family: Poppins, sans-serif;
`;

const JobSearchSubtitle = styled.p`
    font-size: 24px;
    font-weight: 700;
    color: #7b757f;
    margin-top: 10px;
    font-family: Poppins, sans-serif;
    line-height: 1.33;

    @media (max-width: 991px) {
        max-width: 100%;
    }
`;

const JobSearchForm = styled.form`
    display: flex;
    gap: 20px;
    margin-top: 30px;
    border: 1px solid #7b757f;
    border-radius: 10px;
    padding: 10px;

    @media (max-width: 991px) {
        flex-wrap: wrap;
    }
`;

const FormField = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
`;

const JobSearchInput = styled.input`
    padding: 8px 16px;
    border: 1px solid #6b538c;
    border-radius: 4px;
    background-color: #fff;
    font-family: Poppins, sans-serif;
    width: 200px;
`;

const SearchButton = styled.button`
    padding: 8px 16px;
    border-radius: 12px;
    background-color: #6b538c;
    color: #fff;
    font-weight: 700;
    font-family: Roboto, sans-serif;
`;

const JobList = styled.section`
    display: flex;
    gap: 20px;
    margin-top: 30px;
    padding: 10px;

    @media (max-width: 991px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const JobListColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 43%;

    @media (max-width: 991px) {
        width: 100%;
    }
`;

const JobCard = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 40px;
    background-color: #eddcff;
    border: 2px solid #6b538c;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 10px;

    @media (max-width: 991px) {
        padding: 0 20px;
    }
`;

const JobTitle = styled.h3`
    font-size: 28px;
    font-family: Poppins, sans-serif;
    width: 100%;
`;

const CompanyName = styled.p`
    font-family: Poppins, sans-serif;
    margin-top: 18px;
    letter-spacing: 0.15px;
`;

const Location = styled.p`
    font-family: Poppins, sans-serif;
    letter-spacing: 0.15px;
`;

const Tags = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 17px;
    padding-bottom: 3px;
    width: 100%;
    font-size: 12px;
    color: #773dc3;
`;

const Tag = styled.li`
    border: 1px solid #773dc3;
    border-radius: 40px;
    padding: 8px 10px;
    font-family: Poppins, sans-serif;

    &:last-child {
        color: #fff;
        background-color: #773dc3;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }
`;

const JobDescription = styled.p`
    font-size: 14px;
    line-height: 1.43;
    margin-top: 15px;
    font-family: Poppins, sans-serif;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
`;

const Separator = styled.hr`
    margin-top: 14px;
    width: 86px;
    height: 1px;
    background-color: #260e44;
    border: none;
`;

const ViewPostingButton = styled.button`
    padding: 8px 16px;
    margin-top: 15px;
    border-radius: 12px;
    background-color: #6b538c;
    color: #fff;
    font-weight: 700;
    font-family: Roboto, sans-serif;
`;

const JobDetailsColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 57%;

    @media (max-width: 991px) {
        width: 100%;
    }
`;

const HighlightedJob = styled.article`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    background-color: #eddcff;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 40px;

    @media (max-width: 991px) {
        width: 100%;
    }
`;

const HighlightedJobTitle = styled.h3`
    font-size: 28px;
    font-family: Poppins, sans-serif;
`;

const HighlightedJobHeader = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 10px;
`;

const HighlightedJobImage = styled.img`
    width: 50px;
    border: 2px solid #2d3648;
`;

const HighlightedJobInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ApplyButton = styled.button`
    padding: 8px 16px;
    margin-top: 10px;
    background-color: #6b538c;
    color: #fff;
    border-radius: 12px;
    font-family: Roboto, sans-serif;
    font-weight: 700;
`;

const HighlightedJobDescription = styled.p`
    margin-top: 15px;
    padding-top: 11px;
    border-top: 1px solid #000;
    color: #000;
    line-height: 1.43;
    font-family: Poppins, sans-serif;
    font-size: 14px;
`;

export default JobPostingPage;
