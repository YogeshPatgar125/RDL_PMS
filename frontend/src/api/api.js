import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const PROJECT_API_URL = "http://localhost:5000/api/projects";
const NOTIFICATION_API_URL = "http://localhost:5000/api/notifications";

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// 1. Fetch Team Leaders
export const getTeamLeader = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw { message: "Unauthorized: No token provided" };

    const response = await axios.get(`${PROJECT_API_URL}/teamLeader`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch team leaders" };
  }
};

// 2. Add User (Admin creating TL or Employee)
export const addUser = async (userData) => {
  try {
    const token = getAuthToken();
    if (!token) throw { message: "Unauthorized: No token provided" };

    const response = await axios.post(`${API_URL}/add-user`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// 3. Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/`, userData);

    const { token, role, userId, specificRole } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // ✅ Store specificRole only if user is an employee
      if (role === "employee" && specificRole) {
        localStorage.setItem("specificRole", specificRole);
      } else {
        // 🧹 Clean up in case it was previously stored
        localStorage.removeItem("specificRole");
      }
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};


// 4. Fetch Notifications
export const getNotifications = async (userId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token provided");

    if (!userId) throw new Error("Invalid request: User ID is required");

    const response = await axios.get(`${NOTIFICATION_API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);

    throw error.response?.data || { message: "Failed to fetch notifications" };
  }
};

// // 5. Mark All Notifications as Read

export const handleMarkAsRead = async (notificationId) => {
  try {
    const token = getAuthToken();
    if (!token) throw { message: "Unauthorized: No token provided" };

    const response = await axios.post(
      `${NOTIFICATION_API_URL}/mark-read`,
      { notificationId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to mark notification as read" };
  }
};




// ==============================
// ✅ NEW API FUNCTIONS BELOW ✅
// ==============================

// 6. Fetch a Project by ID
export const getProjectById = async (projectId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await axios.get(`${PROJECT_API_URL}/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch project details" };
  }
};

// 7. Assign Employees to a Project (Multi-select)
export const assignEmployeesToProject = async (projectId, employeeIds) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await axios.post(
      `${PROJECT_API_URL}/assign-employees/${projectId}`,
      { employeeIds },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to assign employees to project" };
  }
};


export const getAllEmployee = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw { message: "Unauthorized: No token provided" };

    const response = await axios.get(`${PROJECT_API_URL}/employee`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch employee" };
  }
};


// 8. Fetch Projects Assigned to an Employee
export const getAssignedProjects = async (userId, role) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token provided");

    const url =
      role === "employee"
        ? `${PROJECT_API_URL}/employee/projects/${userId}`
        : `${PROJECT_API_URL}/teamleader/projects/${userId}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch assigned projects" };
  }
};


// 9. Update Project Status
export const updateProjectStatus = async (projectId, status) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await axios.put(
      `${PROJECT_API_URL}/status/${projectId}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update project status" };
  }
};


// get teamleader of the project
export const fetchTeamLeaderProjects = async (userId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await axios.get(`${PROJECT_API_URL}/teamleader/projects/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching team leader projects:", error);
    throw error;
  }
};

//get employee of the project
export const fetchEmployeeProjects = async (userId) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await axios.get(`${PROJECT_API_URL}/employee/projects/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching team leader projects:", error);
    throw error;
  }
};



// 10. Update Project Team Members (Add more employees)
// export const updateProjectTeamMembers = async (projectId, additionalEmployees) => {
//   try {
//     const token = getAuthToken();
//     if (!token) throw new Error("Unauthorized: No token provided");

//     const response = await axios.put(
//       `${PROJECT_API_URL}/update-team-members/${projectId}`,
//       { additionalEmployees },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Failed to update team members" };
//   }
// };
