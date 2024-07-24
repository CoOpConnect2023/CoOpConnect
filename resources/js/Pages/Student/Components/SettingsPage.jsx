import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from '@inertiajs/react';
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword, deleteUser, getUser, selectUser } from "@/Features/users/userSlice";
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
    Message
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


    return (
        <Main>
            <Section className="account-section">
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
            <DummySection>
                <FormColumn>
                    <FormContent>
                        <FormTitle>Dummy Container</FormTitle>
                        <FormDetail>
                            Lorem ipsum is a placeholder text commonly used to
                            demonstrate the visual form of a document or a
                            typeface without relying on meaningful content.
                        </FormDetail>
                    </FormContent>
                </FormColumn>
                <FormButtonColumn>
                    <SettingsButton>Settings Button</SettingsButton>
                </FormButtonColumn>
            </DummySection>
            <DummySection>
                <FormColumn>
                    <FormContent>
                        <FormTitle>Dummy Container</FormTitle>
                        <FormDetail>
                            Lorem ipsum is a placeholder text commonly used to
                            demonstrate the visual form of a document or a
                            typeface without relying on meaningful content.
                        </FormDetail>
                    </FormContent>
                </FormColumn>
                <FormButtonColumn>
                    <SettingsButton>Settings Button</SettingsButton>
                </FormButtonColumn>
            </DummySection>
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
