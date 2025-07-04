import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const OutputPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ldif = location.state?.ldif || "No data received.";

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(ldif);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">LDIF Output</h1>
            <pre className="bg-white p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono border border-gray-300">
                {ldif}
            </pre>

            <div className="mt-4 flex gap-4">
                <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {copied ? "Copied!" : "Copy to Clipboard"}
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to Form
                </button>
            </div>
        </div>
    );
};
