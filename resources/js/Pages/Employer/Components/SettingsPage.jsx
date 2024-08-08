import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from '@inertiajs/react';
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword, deleteUser, getUser, selectUser } from "@/Features/users/userSlice";
import Modal from "./ConfirmationModal";
import { toggleDarkMode, setTextSize } from "@/Features/accessibility/accessibilitySlice";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    PasswordChangeForm,
    FormField,
    Label,
    Input,
    SubmitButton,
    Message,
    OtherOptionButton,
} from "../Styling/SettingsPage.styles";

const appUrl = import.meta.env.VITE_APP_URL;

function SettingsPanel() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const darkMode = useSelector(state => state.accessibility.darkMode);
    const textSize = useSelector(state => state.accessibility.textSize);
    const { post } = useForm();
    const [activeTab, setActiveTab] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [privacySetting, setPrivacySetting] = useState("Private");
    const [showDeleteModal, setShowDeleteModal] = useState(false);



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
                post(route('logout')).then(() => {
                    window.location.reload();
                });
            })
            .catch((error) => {
                setMessage(error.message || "An error occurred");
            });
    };

    const handleTextSizeChange = (size) => {
        dispatch(setTextSize(size));
    };

    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <Main>
            <Section darkMode={darkMode} className="account-section">
                <AccountHeader>
                    <AccountTitle>Account</AccountTitle>
                    <AccountDetail onClick={() => handleTabClick('password')} active={activeTab === 'password'}>Password</AccountDetail>
                    <AccountDetail onClick={() => handleTabClick('notifications')} active={activeTab === 'notifications'}>Notifications</AccountDetail>
                    <AccountDetail onClick={() => handleTabClick('preferences')} active={activeTab === 'preferences'}>Preferences</AccountDetail>
                </AccountHeader>
                {activeTab === 'password' && (
                    <PasswordChangeForm onSubmit={handlePasswordChange}>
                        <FormField>
                            <Label>Current Password</Label>
                            <Input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </FormField>
                        <FormField>
                            <Label>Confirm New Password</Label>
                            <Input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </FormField>
                        {message && <Message>{message}</Message>}
                        <SubmitButton>Change Password</SubmitButton>
                    </PasswordChangeForm>
                )}
                <FormSection>
                    <FormColumn>
                        <FormContent>
                            <FormTitle>Delete Account</FormTitle>
                            <FormDetail>
                                Delete your account from the CO-OP Connect
                                platform permanently. This will remove access to
                                the account. Your account information will also
                                be deleted.
                            </FormDetail>
                        </FormContent>
                    </FormColumn>
                    <FormButtonColumn>
                        <DeleteButton onClick={handleDeleteAccount}>Delete Account</DeleteButton>
                    </FormButtonColumn>
                </FormSection>
            </Section>
            <SettingsSection>
                <SettingsHeader>
                    <SettingsColumn>
                        <SettingsContent>
                            <SettingsTitle>Profile Privacy</SettingsTitle>
                            <SettingsDetail>
                                Anyone can find and view the contents of your
                                profile. Your profile will be viewable from job
                                postings and search functions.
                            </SettingsDetail>
                        </SettingsContent>
                    </SettingsColumn>
                    <SettingsControls>
                        <CurrentSelection>
                            Currently Selected: {privacySetting}
                        </CurrentSelection>
                        <SettingsOptions>
                            <OptionButton
                                className={privacySetting === "Private" ? "private" : ""}
                                onClick={() => handlePrivacyChange("Private")}
                            >
                                Private
                            </OptionButton>
                            <OptionButton
                                className={privacySetting === "Public" ? "public" : ""}
                                onClick={() => handlePrivacyChange("Public")}
                            >
                                Public
                            </OptionButton>
                        </SettingsOptions>
                    </SettingsControls>
                </SettingsHeader>
            </SettingsSection>
            <SettingsSection>
                <SettingsHeader>
                    <SettingsColumn>
                        <SettingsContent>
                            <SettingsTitle>Accessibility Settings</SettingsTitle>
                            <SettingsDetail>Adjust your viewing preferences</SettingsDetail>
                        </SettingsContent>
                    </SettingsColumn>
                    <SettingsControls>
                        <CurrentSelection>Text Size: {textSize}</CurrentSelection>
                        <SettingsOptions>
                            <OtherOptionButton
                                onClick={() => handleTextSizeChange('small')}
                                active={textSize === 'small'}
                            >
                                Small
                            </OtherOptionButton>
                            <OtherOptionButton
                                onClick={() => handleTextSizeChange('medium')}
                                active={textSize === 'medium'}
                            >
                                Medium
                            </OtherOptionButton>
                            <OtherOptionButton
                                onClick={() => handleTextSizeChange('large')}
                                active={textSize === 'large'}
                            >
                                Large
                            </OtherOptionButton>
                        </SettingsOptions>
                        <OtherOptionButton onClick={handleDarkModeToggle}>
                        {darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                        {darkMode ? " Light Mode" : " Dark Mode"}
                        </OtherOptionButton>
                    </SettingsControls>
                </SettingsHeader>
            </SettingsSection>
            {showDeleteModal && (
                <Modal
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


