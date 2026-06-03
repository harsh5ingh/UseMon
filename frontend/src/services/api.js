const API_URL = "http://127.0.0.1:5000";

export async function getUsageData() {
  const response = await fetch( `${API_URL}/data`);
  return response.json();
}

export async function getStats() {
  const response = await fetch(` ${API_URL}/stats`);
  return response.json();
}