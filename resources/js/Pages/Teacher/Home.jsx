import { useState, useEffect } from "react";
import styled from "styled-components";
import AddDocuments from "./Components/AddDocuments";
import StudentsSection from "./Components/StudentsSection";
import StudentStatus from "./Components/StudentStatus";
import AdminPanel from "./Components/AdminPanel";
import ReflectionDocuments from "./Components/ReflectionDocuments";
import NavBar from "./Components/NavBar";
import {
    MainContainer,
    TopContainer,
    BottomContainer,
    StudentsSectionContainer,
    AdminPanelContainer,
} from "./Styling/Home.styles";
const appUrl = import.meta.env.VITE_APP_URL;


export default function Home() {

    const [students, setStudents] = useState([]);
    const [percentages, setPercentages] = useState({
        working: 0,
        interviewing: 0,
        searching: 0,
    });
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch the XSRF token from cookies and set it in Axios headers
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;

        // Fetch the user ID
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${appUrl}/api/user-id`);
                const fetchedUser = response.data.user;
                setUser(fetchedUser);

            } catch (error) {
                console.error("Error fetching user and notifications:", error);
            }
        };

        fetchUser();
}, []);

useEffect(() => {
    // Fetch percentages only if user is defined
    if (user) {
        axios
            .get(`http://127.0.0.1:8000/api/students/teacher/${user.id}`)
            .then((response) => {
                setPercentages(response.data.percentages);
                setStudents(response.data.students)
            })
            .catch((error) => {
                console.error("Error fetching percentages:", error);
            });
    }
}, [user]);




    return (
        <>
            <NavBar header={"Home"}>
                <MainContainer>
                    <TopContainer>
                        <StudentsSectionContainer>
                            <StudentsSection students={students} />
                        </StudentsSectionContainer>

                        <StudentStatus percentages={percentages} />
                    </TopContainer>
                    <BottomContainer>
                        <ReflectionDocuments />

                        <AdminPanelContainer>
                            <AdminPanel />
                        </AdminPanelContainer>
                    </BottomContainer>
                </MainContainer>
            </NavBar>
        </>
    );
}
