import axios from "axios";

const api = axios.create({
  // Base URL is proxied by setupProxy; keep relative paths here.
  timeout: 15000,
});

export async function fetchEmployees({ signal } = {}) {
  const res = await api.post(
    "/api/gettabledata.php",
    { username: "test", password: "123456" },
    { signal }
  );

  const table = res?.data?.TABLE_DATA?.data;
  if (!Array.isArray(table)) return [];

  return table.map((item, index) => ({
    id: index + 1,
    name: item?.[0] ?? "",
    position: item?.[1] ?? "",
    city: item?.[2] ?? "",
    extn: item?.[3] ?? "",
    startDate: item?.[4] ?? "",
    salary: item?.[5] ?? "",
  }));
}

export default api;

