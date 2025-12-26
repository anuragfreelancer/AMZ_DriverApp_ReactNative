import { base_url } from "..";
import { errorToast, successToast } from "../../utils/customToast";

export const BaseUrl = 'http://server-php-8-3.technorizen.com/car_dealership/api/';

export const loginApi = async (
  param: { url: string; body?: any; token?: string },
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    if (param.token) {
      myHeaders.append('Authorization', `Bearer ${param.token}`);
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(param.body),
      redirect: 'follow',
    };

    const response = await fetch(`${BaseUrl}${param.url}`, requestOptions);

    const text = await response.text();
    let resJson;
     try {
      resJson = JSON.parse(text);
    } catch {
      resJson = { success: false, message: text };
    }

    setLoading(false);
    return resJson;
  } catch (error) {
    console.error('POST API Error:', error);
    setLoading(false);
    return null;
  }
};

 
 
export const verifyOtp = async (
  param: { url: string; body?: any; token?: string },
  setLoading: (loading: boolean) => void ,
 ) => {
  try {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    if (param.token) {
      myHeaders.append('Authorization', `Bearer ${param.token}`);
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(param.body),
      redirect: 'follow',
    };

    const response = await fetch(`${BaseUrl}${param.url}`, requestOptions);

    const text = await response.text();
    let resJson;
console.log("text",text)
    try {
      resJson = JSON.parse(text);
    } catch {
      resJson = { success: false, message: text };
    }

    setLoading(false);
    return resJson;
  } catch (error) {
    console.error('POST API Error:', error);
    setLoading(false);
    return null;
  }
};
export const SecurityStepApi = async (
  param: { url: string; body?: any; token?: string },
  setLoading: (loading: boolean) => void ,
 ) => {
  try {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    if (param.token) {
      myHeaders.append('Authorization', `Bearer ${param.token}`);
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(param.body),
      redirect: 'follow',
    };

    const response = await fetch(`${BaseUrl}${param.url}`, requestOptions);

    const text = await response.text();
    let resJson;
     try {
      resJson = JSON.parse(text);
    } catch {
      resJson = { success: false, message: text };
    }

    setLoading(false);
    return resJson;
  } catch (error) {
    console.error('POST API Error:', error);
    setLoading(false);
    return null;
  }
};
 

 
export const SetPinApi = async (
  param: {
    url: string;
    body?: any;
    token?: string;
  },
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (param.token) {
      headers.append('Authorization', `Bearer ${param.token}`);
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(param.body),
    };

    const response = await fetch(`${BaseUrl}${param.url}`, requestOptions);
    const text = await response.text();

    let resJson;
    try {
      resJson = JSON.parse(text);
    } catch {
      resJson = { success: false, message: text };
    }

    setLoading(false);
    return resJson;
  } catch (error) {
    console.error('POST API Error:', error);
    setLoading(false);
    return { success: false, message: 'Network error' };
  }
};




 
 export const Privacypolicy = async (setLoading: any) => {
  setLoading(true);
  try {
    const response = await fetch(`${BaseUrl}common/get_privacy_policy`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);

    console.log("parsedResponse", parsedResponse);

    if (parsedResponse?.status == 1) {
      successToast(parsedResponse?.message);
      return parsedResponse; // ✅ Return the data
    }  

  } catch (error: any) {
    console.error('Privacy Policy error:', error);
    errorToast(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};


 export  const Termsconditions = async (setLoading: any) => {
  setLoading(true);
  try {
    const response = await fetch(`${BaseUrl}common/get_terms_and_condition`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);

    console.log("parsedResponse", parsedResponse);

    if (parsedResponse?.status == 1) {
      successToast(parsedResponse?.message);
      return parsedResponse; // ✅ Return the data
    }  
 

  } catch (error: any) {
    console.error('Privacy Policy error:', error);
    errorToast(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};


export const Ask_support = async (payload: {
  user_id: number;
  message: string;
}) => {
  try {
    const response = await fetch(`${BaseUrl}common/ask_support`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("ask_support response:", result);
    return result;

  } catch (error: any) {
    console.error("Ask support error:", error);
    return null;
  }
};

export const getProfileApi = async (
  token: string,
  setLoading: (v: boolean) => void
) => {
  try {
    setLoading(true);

    const response = await fetch(`${BaseUrl}auth/get-profile`, {
      method: 'POST', // ✅ FIXED
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const text = await response.text();

    let res;
    try {
      res = JSON.parse(text);
    } catch (e) {
      console.log('Non JSON response:', text);
      return null;
    }

    return res;
  } catch (error) {
    console.log('Get Profile Error:', error);
    return null;
  } finally {
    setLoading(false);
  }
};


export const updateProfileApi = async (
  token: string,
  body: {
    user_name: string;
    email: string;
    image?: any;
  },
  setLoading: (v: boolean) => void
) => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append('user_name', body.user_name);
    formData.append('email', body.email);

    if (body.image?.path) {
      formData.append('image', {
        uri: body.image.path,
        type: body.image.mime || 'image/jpeg',
        name: 'profile.jpg',
      } as any);
    }

    const response = await fetch(`${BaseUrl}auth/update-profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: formData,
    });

    const text = await response.text();

    let res;
    try {
      res = JSON.parse(text);
    } catch (e) {
      console.log('Non JSON response:', text);
      return null;
    }

    return res;
  } catch (error) {
    console.log('Update Profile Error:', error);
    return null;
  } finally {
    setLoading(false);
  }
};
