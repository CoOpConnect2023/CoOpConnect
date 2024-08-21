import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getInterviews,
    selectInterviews,
} from "@/Features/userJobs/userJobsSlice";

export default function TestData() {
    const dispatch = useDispatch();

    const interviews = useSelector(selectInterviews);

    useEffect(() => {
            dispatch(getInterviews());

    }, [dispatch]);


   

    return <div></div>;
}
