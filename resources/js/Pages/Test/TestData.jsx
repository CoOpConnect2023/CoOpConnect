import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getJobs,
    selectJobsStatus,
    selectJobs,
} from "@/Features/jobs/jobsSlice";

export default function TestData() {
    const dispatch = useDispatch();

    const jobs = useSelector(selectJobs);
    const jobsStatus = useSelector(selectJobsStatus);

    useEffect(() => {
        if (jobsStatus === "idle") {
            dispatch(getJobs());
        }
    }, [jobsStatus, dispatch]);


    console.log(jobs);

    return <div></div>;
}
