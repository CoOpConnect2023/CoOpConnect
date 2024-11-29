import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import NavBar from './Components/NavBar';
import { Container, Title, ReflectionItem, ReflectionInfo, ReflectionTitle, ReflectionSize, ButtonGroup, ViewButton, ShareButton, DeleteButton, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, CloseButton } from '../Student/Styling/MyReflections.styles';
import { getMyReflections, getSchoolReflections, selectMyReflections, selectReflections, deleteReflection } from '@/Features/reflections/reflectionsSlice';



const Reflections = () => {

    const [selectedReflection, setSelectedReflection] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const dispatch = useDispatch();
    const reflections = useSelector(selectReflections);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);

    useEffect(() => {
        dispatch(getSchoolReflections());

    }, [dispatch]);

console.log(reflections)

    const handleDelete = async (id) => {
        try {
            // Delete the reflection
            await dispatch(deleteReflection({ reflectionId: id })).unwrap();

            // Fetch updated reflections
            await dispatch(getSchoolReflections());
            setIsConfirmDeleteOpen(null)
        } catch (error) {
            console.error('Error deleting reflection:', error);
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const openModal = (reflection) => {
        setSelectedReflection(reflection);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReflection(null);
    };

    const openConfirmDeleteModal = (reflection) => {
        setSelectedReflection(reflection);
        setIsConfirmDeleteOpen(true);
    };

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteOpen(false);
        setSelectedReflection(null);
    };

    return (
        <NavBar header={"Reflections"}>
            <Container darkMode={darkMode} fontSize={fontSize}>

                {!reflections ? (
                    <p>No reflections available.</p>
                ) : (
                    reflections.map((reflection) => (
                        <ReflectionItem darkMode={darkMode} fontSize={fontSize} key={reflection.id}>
                            <ReflectionInfo darkMode={darkMode} fontSize={fontSize}>
                                <ReflectionTitle darkMode={darkMode} fontSize={fontSize}>{`Reflection - #${reflection.id}`}</ReflectionTitle>
                                <ReflectionSize darkMode={darkMode} fontSize={fontSize}>{formatDate(reflection.createdAt)}</ReflectionSize>
                            </ReflectionInfo>
                            <ButtonGroup darkMode={darkMode} fontSize={fontSize}>
                                <ViewButton darkMode={darkMode} fontSize={fontSize} onClick={() => openModal(reflection)}>View</ViewButton>
                                {/* <ShareButton darkMode={darkMode} fontSize={fontSize}>Share</ShareButton>
                                <DeleteButton darkMode={darkMode} fontSize={fontSize} onClick={() => openConfirmDeleteModal(reflection)}>Delete</DeleteButton> */}
                            </ButtonGroup>
                        </ReflectionItem>
                    ))
                )}

{isConfirmDeleteOpen && (
                    <ModalOverlay darkMode={darkMode} fontSize={fontSize}>
                        <ModalContent darkMode={darkMode} fontSize={fontSize}>
                            <ModalHeader darkMode={darkMode} fontSize={fontSize}>
                                <h2>Confirm Delete</h2>

                            </ModalHeader>
                            <ModalBody darkMode={darkMode} fontSize={fontSize}>
                                <p>Are you sure you want to delete Reflection #{selectedReflection?.id}?</p>
                            </ModalBody>
                            <ModalFooter style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Optional to align buttons vertically
        width: '100%', // Ensure the footer spans full width
    }} darkMode={darkMode} fontSize={fontSize}>
                                <ViewButton
                                    darkMode={darkMode}
                                    fontSize={fontSize}
                                    onClick={closeConfirmDeleteModal}
                                >
                                    Cancel
                                </ViewButton>
                                <DeleteButton
                                    darkMode={darkMode}
                                    fontSize={fontSize}
                                    onClick={() => handleDelete(selectedReflection.id)}
                                >
                                    Confirm
                                </DeleteButton>
                            </ModalFooter>
                        </ModalContent>
                    </ModalOverlay>
                )}
                {isModalOpen && (
                    <ModalOverlay darkMode={darkMode} fontSize={fontSize}>
                        <ModalContent darkMode={darkMode} fontSize={fontSize}>
                            <ModalHeader darkMode={darkMode} fontSize={fontSize}>
                                <h2>Reflection Details</h2>
                                <CloseButton darkMode={darkMode} fontSize={fontSize} onClick={closeModal}>X</CloseButton>
                            </ModalHeader >
                            {selectedReflection && (
                                <>
                                    <ModalBody darkMode={darkMode} fontSize={fontSize}>
                                        <p><strong>Title:</strong> Reflection - #{selectedReflection.id}</p>
                                        <p><strong>Created At:</strong> {formatDate(selectedReflection.createdAt)}</p>
                                        <p><strong>Content:</strong> {selectedReflection.content}</p>
                                    </ModalBody>
                                    <ModalFooter darkMode={darkMode} fontSize={fontSize}>

                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </ModalOverlay>
                )}
            </Container>
        </NavBar>
    );
};







export default Reflections;
