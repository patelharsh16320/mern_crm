const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API

//! For Users Start

// Fetch All Api 
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

// Create New Users 
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

// Update Users 
export const updateUser = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/update-user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: formData.user_id,
        name: formData.username,
        email: formData.email,
        password: formData.password,
        c_password: formData.c_password,
        number: formData.phone,
        address: formData.address,
        created_at: formData.doj
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update user');
    return data;
  } catch (err) {
    throw err;
  }
};

// Delete Single User
export const deleteUserById = async (userId) => {
  const res = await fetch(`${BASE_URL}/delete-user/${userId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return await res.json();
};

// Delete All User
export const deleteAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/delete-alluser`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete all users');
  return data;
};

//! For Users End

//! For Ticket Start
// Fetch All Api 
export const fetchAllTicket = async () => {
  try {
    const res = await fetch(`${BASE_URL}/show-ticket`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch ticket');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching ticket: ', error.message);
    throw error
  }
}

// Create New Ticket 
export const createNewTicket = async (ticketData) => {
  try {
    const response = await fetch(`${BASE_URL}/create-ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

// Update Ticket
export const updateTicketById = async (ticketData) => {
  const res = await fetch(`${BASE_URL}/update-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ticketData)
  });

  const data = await res.json();
  if (!res.ok || data.statusCode !== 200) {
    throw new Error(data.message || "Failed to update ticket");
  }
  return data;
};

// Delete Single Ticket
export const deleteTicketById = async (ticketId) => {
  const res = await fetch(`${BASE_URL}/delete-ticket/${ticketId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return await res.json();
};

// Delete All Ticket
export const deleteAllTicket = async () => {
  const res = await fetch(`${BASE_URL}/delete-allticket`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete all ticket');
  return data;
};


//! For Ticket End

//! For User Login/Logout Start

// Login User
export const LoginUser = async (loginData) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const data = await res.json();

  return data;
};
//! For User Login/Logout End

//! For Role Start
// Role Define
export const allRoles = async (loginData) => {
  const res = await fetch(`${BASE_URL}/show-role`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  const data = await res.json();
  return data;
};

// Update Role
export const updateUserRole = async (payload) => {
  const res = await fetch(`${BASE_URL}/update-role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// Delete Single role
export const deleteRoleById = async (roleId) => {
  const res = await fetch(`${BASE_URL}/delete-role/${roleId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return await res.json();
};

// Delete All Ticket
export const deleteAllRole = async () => {
  const res = await fetch(`${BASE_URL}/delete-allrole`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete all ticket');
  return data;
};


//! For Role End