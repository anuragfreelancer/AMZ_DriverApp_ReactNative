import axios from "axios"; 
import { base_url } from "..";



export const getApi = async (
  endpoint: string,
  setLoading?: any,
  token?: string,
  method?:string
) => {
  try {
    setLoading(true);

    const url = endpoint.startsWith("http")
      ? endpoint
      : `${base_url}${endpoint}`;

    const config = {
      method: method ? method :"GET",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    console.log("📡 Fetching:", url);

    const response = await axios.request(config);
        setLoading(false);

    return response.data;
  } catch (error: any) {
            setLoading(false);

    console.error("GET API Error:", error?.response?.data || error?.message);
    return (
              setLoading(false),
      error?.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  } finally {
            setLoading(false);

   }
};



interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  token?: string;
  setLoading?: (l: boolean) => void;
}

export const apiHelper = async (endpoint: string, options: ApiOptions = {}) => {
  const { method = "GET", body, token, setLoading } = options;

  try {
    if (setLoading) setLoading(true);

    // ✅ Headers
    const headers: any = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    // ✅ Request options
    const requestOptions: RequestInit = {
      method,
      headers,
      redirect: "follow",
    };

    // ✅ Attach body only if not GET
    if (body && method !== "GET") {
      requestOptions.body = JSON.stringify(body);
    }

    const url = `${BaseUrl}${endpoint}`;
    console.log("🌐 API call:", url);

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("❌ API Error:", error);
    return { success: false, message: "Something went wrong" };
  } finally {
    if (setLoading) setLoading(false);
  }
};



export const getAllSliders = async (setLoading?: (l: boolean) => void, token?: string) => {
  return await getApi("general/view-all-sliders", setLoading, token);
};

