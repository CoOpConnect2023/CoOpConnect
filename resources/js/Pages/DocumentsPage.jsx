import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import { FiUpload, FiXCircle } from "react-icons/fi"; // Ensure react-icons is installed

export default function Documents({ auth }) {
    const [documents, setDocuments] = useState([
        { id: 1, title: "Document 1", file: null, fileName: "", fileType: "", doc_id: "" },
        { id: 2, title: "Document 2", file: null, fileName: "", fileType: "", doc_id: "" },
        { id: 3, title: "Document 3", file: null, fileName: "", fileType: "", doc_id: "" },
        { id: 4, title: "Document 4", file: null, fileName: "", fileType: "", doc_id: "" },
    ]);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await axios.get("/api/fetchdocs", {
    //                 params: {
    //                     user_id: auth.user.id,
    //                 }
    //             });
    //             console.log("Response data:", response.data.data);

    //         } catch (error) {
    //             console.error("Fetch error", error);
    //         }
    //     }
    //     fetchData();
    // }, [auth.user.id]);

    const handleFileChange = async (event, documentId) => {
        const file = event.target.files[0];
        if (!file) return;

        setDocuments((docs) =>
            docs.map((doc) =>
                doc.id === documentId
                    ? {...doc, file: URL.createObjectURL(file), fileName: file.name, fileType: file.type,}
                    : doc
            )
        );

        const formData = new FormData();
        formData.append("document", file);
        formData.append("user_id", auth.user.id);
        try {
            setDocuments(docs =>
                docs.map(doc => 
                    doc.id === documentId ? { ...doc, file: URL.createObjectURL(file), fileName: file.name, fileType: file.type } : doc
                )
            );
            const response = await axios.post("/api/uploaddocs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(response.data.id);
            setDocuments((docs) =>
                docs.map((doc) =>
                doc.id === documentId
                    ? { ...doc, doc_id: response.data.id }
                    : doc
            ));
        } catch (error) {
            console.error("Upload error", error);
            setDocuments((docs) =>
                docs.map((doc) =>
                    doc.id === documentId
                        ? { ...doc, file: null, fileName: "", fileType: "" }
                        : doc
                )
            );
        }
    };

    const removeDocument = async (documentId, doc_id) => {
        setDocuments((docs) =>
            docs.map((doc) =>
                doc.id === documentId
                    ? { ...doc, file: null, fileName: "", fileType: "" }
                    : doc
            )
        );

        await axios.delete(`/api/deletedoc/${doc_id}`);
    };

    const renderDocumentItem = (document) => (
        <div
            key={document.id}
            className="relative p-4 border flex flex-col justify-center items-center shadow-sm rounded-lg bg-white"
        >
            <h3 className="text-lg font-bold mb-2">{document.title}</h3>
            {document.file ? (
                <>
                    {document.fileType === "application/pdf" ? (
                        <iframe
                            src={document.file}
                            className="w-full h-64"
                            type="application/pdf"
                        ></iframe>
                    ) : (
                        <img
                            src={document.file}
                            alt="Uploaded document"
                            className="max-w-full max-h-32 mb-2"
                        />
                    )}
                    <span className="text-sm text-gray-500">
                        {document.fileName}
                    </span>
                    <button
                        onClick={() => removeDocument(document.id, document.doc_id)}
                        className="absolute top-0 right-0 m-2 text-red-500"
                    >
                        <FiXCircle size={24} />
                    </button>
                </>
            ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <FiUpload size={24} className="text-gray-400" />
                    <span className="text-gray-400">Upload Document</span>
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e, document.id)}
                        className="hidden"
                    />
                </label>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Documents
                </h2>
            }
        >
            <Head title="Documents" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4">
                        {documents.map(renderDocumentItem)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
