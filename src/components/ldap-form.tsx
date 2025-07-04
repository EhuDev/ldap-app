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

    const handleSubmit = (e: React.FormEvent) => {
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

        navigate("/output", { state: { ldif } });

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Organization</label>
                <select
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
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
                    className="w-full mt-1 p-2 border rounded-md"
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
                className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
            >
                Generate LDIF
            </button>
        </form>
    );
};


