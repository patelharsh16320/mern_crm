const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API

//! Fetch All Api 
export const fetchAllUsers = async () => {
    try {
        const res = await fetch(`${BASE_URL}/show-users`, {
            method: 'GET',
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching users: ', error.message);
        throw error
    }
}

//! Create New Users 
export const createUser = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/create-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.username,
                email: formData.email,
                number: formData.phone,
                doj: formData.doj,
                address: formData.address,
                password: "123456",
                c_password: "123456"
            }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to create user');

        return data;
    } catch (err) {
        throw err;
    }
};
