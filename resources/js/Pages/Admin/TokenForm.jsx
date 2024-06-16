import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

const TokenForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        token: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("generate-token"));
    };

    return (
        <div>
            <h2>Request Token</h2>
            <form onSubmit={submit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {data.token && <p style={{ color: "green" }}>{data.token}</p>}
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
    );
};

export default TokenForm;
