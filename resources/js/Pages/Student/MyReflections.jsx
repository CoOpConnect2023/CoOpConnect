import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import NavBar from './Components/NavBar';
import { Container, Title, ReflectionItem, ReflectionInfo, ReflectionTitle, ReflectionSize, ButtonGroup, ViewButton, ShareButton, DeleteButton, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, CloseButton } from './Styling/MyReflections.styles';
import { getMyReflections, selectMyReflections, deleteReflection } from '@/Features/reflections/reflectionsSlice';



const Reflections = () => {

    const [selectedReflection, setSelectedReflection] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const reflections = useSelector(selectMyReflections);

    useEffect(() => {
        dispatch(getMyReflections());

    }, [dispatch]);



    const handleDelete = async (id) => {
        try {

            await dispatch(deleteReflection({ reflectionId: id })).unwrap();
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

    return (
        <NavBar>
            <Container>
                <Title>Reflections</Title>
                {!reflections ? (
                    <p>No reflections available.</p>
                ) : (
                    reflections.map((reflection) => (
                        <ReflectionItem key={reflection.id}>
                            <ReflectionInfo>
                                <ReflectionTitle>{`Reflection - #${reflection.id}`}</ReflectionTitle>
                                <ReflectionSize>{formatDate(reflection.createdAt)}</ReflectionSize>
                            </ReflectionInfo>
                            <ButtonGroup>
                                <ViewButton onClick={() => openModal(reflection)}>View</ViewButton>
                                <ShareButton>Share</ShareButton>
                                <DeleteButton onClick={() => handleDelete(reflection.id)}>Delete</DeleteButton>
                            </ButtonGroup>
                        </ReflectionItem>
                    ))
                )}
                {isModalOpen && (
                    <ModalOverlay>
                        <ModalContent>
                            <ModalHeader>
                                <h2>Reflection Details</h2>
                                <CloseButton onClick={closeModal}>X</CloseButton>
                            </ModalHeader>
                            {selectedReflection && (
                                <>
                                    <ModalBody>
                                        <p><strong>Title:</strong> Reflection - #{selectedReflection.id}</p>
                                        <p><strong>Created At:</strong> {formatDate(selectedReflection.createdAt)}</p>
                                        <p><strong>Content:</strong> {selectedReflection.content}</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <CloseButton onClick={closeModal}>Close</CloseButton>
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
