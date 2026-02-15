import axios from "axios";

/**
 * Checks if user is logged in using /api/auth/me
 * @returns true if logged in
 * @throws error if not logged in
 * 
 */

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
export async function AuthChecking() {
  try {
    const res = await axios.get(`${API}/auth/me`, {
      withCredentials: true,
    });

    // Expecting { user: {...} }
    if (res.data?.user) {
      return true; // ✅ logged in
    }

    throw new Error("Not authenticated");
  } catch (error) {
    throw new Error("Not authenticated");
  }
}
