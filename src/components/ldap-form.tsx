import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LdapForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        organization: "Operations and Customer Experience",
        groupName: "Customer Experience Management",
    });

    const [addList, setAddList] = useState<
        { fullName: string; ldif: string }[]
    >([]);

    const organizations = [
        "Operations and Customer Experience",
        "Finance and Accounting",
        "Human Resources",
        "Technology",
    ];

    const groups = [
        "Customer Experience Management",
        "Technical Support",
        "Billing Support",
        "Product Development",
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddToList = (e: React.FormEvent) => {
        e.preventDefault();

        const fullName = `${formData.firstName} ${formData.lastName}`;
        const userDN = `cn=${fullName},ou=people,o=${formData.organization},dc=mynt,dc=xyz`;
        const groupDN = `cn=${formData.groupName},ou=groups,o=${formData.organization},dc=mynt,dc=xyz`;

        const ldif = `# --- Add the user entry ---
dn: ${userDN}
objectClass: inetOrgPerson
cn: ${fullName}
givenName: ${formData.firstName}
sn: ${formData.lastName}
uid: ${formData.username}
mail: ${formData.email}
userPassword: ${formData.password}

# --- Modify group to add the user as a member ---
dn: ${groupDN}
changetype: modify
add: member
member: ${userDN}
`;

        setAddList((prev) => [...prev, { fullName, ldif }]);
        setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            organization: "Operations and Customer Experience",
            groupName: "Customer Experience Management",
        });
    };

    const handleGenerateAll = () => {
        const combinedLDIF = addList.map((entry) => entry.ldif).join("\n\n");
        navigate("/output", { state: { ldif: combinedLDIF } });
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <h1 className="py-10 text-4xl font-semibold text-center font-poppins">LDAP Form Generator</h1>
            <div className="flex flex-row max-w-4xl py-4 mx-auto space-y-4 bg-white shadow-md rounded-xl">
                <div className="w-full p-4 m-4 shadow-md rounded-xl bg-gray-50">
                    <form onSubmit={handleAddToList} className="space-y-4">
                        {/* --- Input Fields Same as Before --- */}
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Username</label>
                            <input
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Organization</label>
                            <select
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border rounded-md"
                            >
                                {organizations.map((org) => (
                                    <option key={org} value={org}>
                                        {org}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Group Name</label>
                            <select
                                name="groupName"
                                value={formData.groupName}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border rounded-md"
                            >
                                {groups.map((group) => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Add to List
                        </button>
                    </form>
                </div>
                <div className="w-full p-4 mr-4 shadow-md h-fit rounded-xl bg-gray-50">
                    <h2 className="text-lg font-semibold">Added Users:</h2>
                    {addList.length > 0 && (
                        <div className="mt-6 space-y-2">

                            <ul className="list-disc list-inside">
                                {addList.map((entry, index) => (
                                    <li key={index}>{entry.fullName}</li>
                                ))}
                            </ul>
                            <button
                                onClick={handleGenerateAll}
                                className="w-full p-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                            >
                                Generate All LDIF
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};
