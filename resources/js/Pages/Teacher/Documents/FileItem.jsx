import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { faTrash, faEdit, faSave, faShare, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FileContainer,
    FileIcons,
    FileDetails,
    FileTitle,
    FileSize,
    FileActions,
    ActionButton,
    ToggleSwitch,
    Slider,
VisibilityContainer,
VisibilityLabel  } from "../Styling/Document.styles";
    import { patchDocument } from "@/Features/documents/documentsSlice";












export const FileItem = ({ title, type, handleDownload, doc, handleDelete, userName, darkMode, fontSize, handleShareClick, activeTab }) => {
    const [isVisible, setIsVisible] = useState(doc.visible);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const dispatch = useDispatch();



const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility); // Optimistically update the local state

    // Dispatch Redux thunk to update visibility in the backend
    dispatch(patchDocument({ documentId: doc.id, visible: newVisibility }));
};

const handleEditClick = () => {
    if (isEditing) {
        // Save the edited title
        dispatch(patchDocument({ documentId: doc.id, title: newTitle }));
    }
    setIsEditing(!isEditing); // Toggle edit mode
};

    return (
        <FileContainer fontSize={fontSize} darkMode={darkMode} >
            {activeTab != "Shared With Me" &&  <FileIcons fontSize={fontSize} darkMode={darkMode}>
            <VisibilityContainer>
                <ToggleSwitch onClick={toggleVisibility} fontSize={fontSize} darkMode={darkMode} isVisible={isVisible}>
                    <Slider fontSize={fontSize} darkMode={darkMode} isVisible={isVisible} />
                </ToggleSwitch><VisibilityLabel fontSize={fontSize} darkMode={darkMode}>{isVisible ? 'Visible' : 'Hidden'}</VisibilityLabel></VisibilityContainer>

                {/* Delete Icon */}
                <FontAwesomeIcon
                    icon={faTrash}
                    style={{ cursor: "pointer", fontSize: "24px", color: darkMode ? '#fff' : '#000' }}
                    onClick={() => handleDelete(type)}
                />
            </FileIcons>}


            <FileDetails fontSize={fontSize} darkMode={darkMode}>
                <div>
                    {/* Conditionally render input or static title based on edit mode */}
                    {isEditing ? (
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            style={{ fontSize: fontSize }}
                        />
                    ) : (
                        <FileTitle fontSize={fontSize} darkMode={darkMode}>
                            {title}
                        </FileTitle>
                    )}
                    <FileSize fontSize={fontSize} darkMode={darkMode}>
                        {type}
                        {activeTab === "Shared With Me" && doc.user?.email && (
                            <> • {doc.user.email}</>
                        )}
                    </FileSize>
                </div>
                <FileActions fontSize={fontSize} darkMode={darkMode}>
                    <ActionButton fontSize={fontSize} darkMode={darkMode} onClick={() => handleDownload(type, title)}>
                        Download<FontAwesomeIcon icon={faDownload} />
                    </ActionButton>
                    {activeTab != "Shared With Me" && <>
                    <ActionButton onClick={handleEditClick} fontSize={fontSize} darkMode={darkMode}>
                        {isEditing ? (
                            <>Save <FontAwesomeIcon icon={faSave} /></>
                        ) : (
                            <>Edit <FontAwesomeIcon icon={faEdit} /></>
                        )}
                    </ActionButton>

                    <ActionButton onClick={() => handleShareClick(doc.id, doc.title)}  fontSize={fontSize} darkMode={darkMode} outline>
                        Share<FontAwesomeIcon icon={faShare} />
                    </ActionButton>
                    </>
                    }
                </FileActions>
            </FileDetails>

        </FileContainer>
    );
};
