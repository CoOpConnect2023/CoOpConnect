import styled from 'styled-components';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
`;

const Description = styled.div`
    margin-bottom: 16px;
    font-size: 14px;
`;

const StatusMessage = styled.div`
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    align-self: center;
`;

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'), {
            onSuccess: () => {
                // Redirect after 4 seconds
                setTimeout(() => {
                    Inertia.visit('/login');
                }, 4000);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <Container>
                <Description>Enter your email to receive a reset link.</Description>

                {status && <StatusMessage>{status}</StatusMessage>}

                <Form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} />

                    <ButtonContainer>
                        <PrimaryButton disabled={processing}>Email Password Reset Link</PrimaryButton>
                    </ButtonContainer>
                </Form>
            </Container>
        </GuestLayout>
    );
}
