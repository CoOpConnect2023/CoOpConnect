import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from '@inertiajs/react';
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword, updateUserPreferences, deleteUser, getUser, selectUser } from "@/Features/users/userSlice";
import { toggleDarkMode, setTextSize } from "@/Features/accessibility/accessibilitySlice";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./ConfirmationModal";
import {
    Main,
    Section,
    FormSection,
    AccountHeader,
    AccountTitle,
    AccountDetail,
    FormColumn,
    FormContent,
    FormTitle,
    FormDetail,
    FormButtonColumn,
    DeleteButton,
    SettingsSection,
    SettingsHeader,
    SettingsColumn,
    SettingsContent,
    SettingsTitle,
    SettingsDetail,
    SettingsControls,
    CurrentSelection,
    SettingsOptions,
    OptionButton,
    DummySection,
    SettingsButton,
    PasswordChangeForm,
    FormField,
    Label,
    Input,
    SubmitButton,
    Message,
    OtherOptionButton,
    SaveOptionButton
} from "../Styling/SettingsPage.styles";

const appUrl = import.meta.env.VITE_APP_URL;

function SettingsPanel() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { post } = useForm();
    const [activeTab, setActiveTab] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [privacySetting, setPrivacySetting] = useState("Private");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const fontSize = useSelector(state => state.accessibility.textSize);
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const userID = user?.id;

    const handleTabClick = (tab) => {
        setActiveTab(activeTab === tab ? null : tab);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        const passwordData = {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: confirmNewPassword,
        };
        console.log('Dispatching updateUserPassword with:', passwordData);
        dispatch(updateUserPassword(passwordData))
            .unwrap()
            .then(() => {
                setMessage("Password updated successfully");
            })
            .catch((error) => {
                setMessage(error.message || "An error occurred");
            });

        setTimeout(() => {
            setMessage("");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        }, 3000);
    };


    const handlePrivacyChange = (setting) => {
        setPrivacySetting(setting);
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = () => {
        dispatch(deleteUser(userID))
            .unwrap()
            .then(() => {
                setMessage("Account deleted successfully");
                setShowDeleteModal(false);
                // Assuming `post` is a function to log out the user
                post(route('logout')).then(() => {
                    window.location.reload();
                });
            })
            .catch((error) => {
                setMessage(error.message || "An error occurred");
            });
    };
    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode());
        console.log(darkMode)
    };
    const handleTextSizeChange = (size) => {
        dispatch(setTextSize(size));
        console.log(fontSize)
    };

    const handlePreferencesUpdate = () => {
        dispatch(updateUserPreferences({
          id: userID,        
          darkMode: darkMode,   
          fontSize: fontSize,     
        }));
      };



    return (
        <Main darkMode={darkMode} fontSize={fontSize}>
            <Section fontSize={fontSize} darkMode={darkMode}  className="account-section">
                <AccountHeader fontSize={fontSize} darkMode={darkMode}>
                    <AccountTitle fontSize={fontSize} darkMode={darkMode}>Account</AccountTitle>
                    <AccountDetail fontSize={fontSize} darkMode={darkMode} onClick={() => handleTabClick('password')} active={activeTab === 'password'}>Password</AccountDetail>
                    <AccountDetail fontSize={fontSize} darkMode={darkMode} onClick={() => handleTabClick('notifications')} active={activeTab === 'notifications'}>Notifications</AccountDetail>
                    <AccountDetail fontSize={fontSize} darkMode={darkMode} onClick={() => handleTabClick('preferences')} active={activeTab === 'preferences'}>Preferences</AccountDetail>
                </AccountHeader >
                {activeTab === 'password' && (
                    <PasswordChangeForm fontSize={fontSize} darkMode={darkMode} onSubmit={handlePasswordChange}>
                        <FormField fontSize={fontSize} darkMode={darkMode}>
                            <Label fontSize={fontSize} darkMode={darkMode}>Current Password</Label>
                            <Input fontSize={fontSize} darkMode={darkMode}
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </FormField>
                        <FormField fontSize={fontSize} darkMode={darkMode}>
                            <Label fontSize={fontSize} darkMode={darkMode}>New Password</Label>
                            <Input fontSize={fontSize} darkMode={darkMode}
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </FormField>
                        <FormField fontSize={fontSize} darkMode={darkMode}>
                            <Label fontSize={fontSize} darkMode={darkMode}>Confirm New Password</Label>
                            <Input fontSize={fontSize} darkMode={darkMode}
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </FormField>
                        {message && <Message fontSize={fontSize} darkMode={darkMode}>{message}</Message>}
                        <SubmitButton fontSize={fontSize} darkMode={darkMode}>Change Password</SubmitButton>
                    </PasswordChangeForm>
                )}
                <FormSection fontSize={fontSize} darkMode={darkMode}>
                    <FormColumn fontSize={fontSize} darkMode={darkMode}>
                        <FormContent fontSize={fontSize} darkMode={darkMode}>
                            <FormTitle fontSize={fontSize} darkMode={darkMode}>Delete Account</FormTitle>
                            <FormDetail fontSize={fontSize} darkMode={darkMode}>
                                Delete your account from the CO-OP Connect
                                platform permanently. This will remove access to
                                the account. Your account information will also
                                be deleted.
                            </FormDetail>
                        </FormContent>
                    </FormColumn>
                    <FormButtonColumn fontSize={fontSize}>
                        <DeleteButton fontSize={fontSize} onClick={handleDeleteAccount}>Delete Account</DeleteButton>
                    </FormButtonColumn>
                </FormSection>
            </Section >
            <SettingsSection fontSize={fontSize} darkMode={darkMode}>
                <SettingsHeader fontSize={fontSize} darkMode={darkMode}>
                    <SettingsColumn fontSize={fontSize} darkMode={darkMode}>
                        <SettingsContent fontSize={fontSize} darkMode={darkMode}>
                            <SettingsTitle darkMode={darkMode} fontSize={fontSize}>Profile Privacy</SettingsTitle>
                            <SettingsDetail fontSize={fontSize} darkMode={darkMode}>
                                Anyone can find and view the contents of your
                                profile. Your profile will be viewable from job
                                postings and search functions.
                            </SettingsDetail>
                        </SettingsContent>
                    </SettingsColumn>
                    <SettingsControls fontSize={fontSize} darkMode={darkMode}>
                        <CurrentSelection>
                            Currently Selected: {privacySetting}
                        </CurrentSelection>
                        <SettingsOptions fontSize={fontSize} darkMode={darkMode}>
                            <OptionButton fontSize={fontSize} darkMode={darkMode}
                                className={privacySetting === "Private" ? "private" : ""}
                                onClick={() => handlePrivacyChange("Private")}
                            >
                                Private
                            </OptionButton>
                            <OptionButton fontSize={fontSize} darkMode={darkMode}
                                className={privacySetting === "Public" ? "public" : ""}
                                onClick={() => handlePrivacyChange("Public")}
                            >
                                Public
                            </OptionButton>
                        </SettingsOptions>
                    </SettingsControls>
                </SettingsHeader>
            </SettingsSection>
            <SettingsSection fontSize={fontSize} darkMode={darkMode}>
                <SettingsHeader fontSize={fontSize} darkMode={darkMode}>
                    <SettingsColumn fontSize={fontSize} darkMode={darkMode}>
                        <SettingsContent fontSize={fontSize} darkMode={darkMode}>
                            <SettingsTitle fontSize={fontSize} darkMode={darkMode}>Accessibility Settings</SettingsTitle>
                            <SettingsDetail fontSize={fontSize} darkMode={darkMode}>Adjust your viewing preferences</SettingsDetail>
                        </SettingsContent>
                    </SettingsColumn>
                    <SettingsControls fontSize={fontSize} darkMode={darkMode}>
                        <CurrentSelection fontSize={fontSize} darkMode={darkMode}>Text Size: {fontSize}</CurrentSelection>
                        <SettingsOptions fontSize={fontSize} darkMode={darkMode}>
                            <OtherOptionButton fontSize={fontSize} darkMode={darkMode}
                                onClick={() => handleTextSizeChange('small')}
                                active={fontSize === 'small'}
                            >
                                Small
                            </OtherOptionButton>
                            <OtherOptionButton fontSize={fontSize} darkMode={darkMode}
                                onClick={() => handleTextSizeChange('medium')}
                                active={fontSize === 'medium'}
                            >
                                Medium
                            </OtherOptionButton>
                            <OtherOptionButton fontSize={fontSize} darkMode={darkMode}
                                onClick={() => handleTextSizeChange('large')}
                                active={fontSize === 'large'}
                            >
                                Large
                            </OtherOptionButton>
                        </SettingsOptions >
                        <OtherOptionButton fontSize={fontSize} darkMode={darkMode} onClick={handleDarkModeToggle}>
                        {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                        {darkMode ? " Light Mode" : " Dark Mode"}
                        </OtherOptionButton>
                        <SaveOptionButton fontSize={fontSize} darkMode={darkMode} onClick={handlePreferencesUpdate}>Save my preferences
                        </SaveOptionButton>
                    </SettingsControls>
                </SettingsHeader >
            </SettingsSection>
            {showDeleteModal && (
                <Modal fontSize={fontSize} darkMode={darkMode}
                    title="Confirm Account Deletion"
                    onConfirm={confirmDeleteAccount}
                    onCancel={() => setShowDeleteModal(false)}
                >
                    Are you sure you want to delete your account? This action cannot be undone.
                </Modal>
            )}
        </Main>
    );
}

export default SettingsPanel;
