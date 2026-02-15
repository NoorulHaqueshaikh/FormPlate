import axios from "axios";

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export async function createFormFromTemplate(templateSlug) {
  const res = await axios.post(
    `${API}/form/user-create`,
    { templateSlug },
    { withCredentials: true }
  );

  return res.data;
}
