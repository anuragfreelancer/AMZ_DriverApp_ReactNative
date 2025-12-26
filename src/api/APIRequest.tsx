import { BaseUrl } from "./authApi/AuthApi";

 

export const POST_API = async (
  token: string,
  body: any,
  endpoint,
  setLoading: (v: boolean) => void
) => {
  try {
    setLoading(true);

    const formData = objectToFormData(body);

    const response = await fetch(`${BaseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        // ❌ DO NOT set Content-Type for FormData
      },
      body: formData,
    });
// console.log(formData, 'formadata')
    const text = await response.text();

    try {
        console.log(JSON.parse(text))
      return JSON.parse(text);
    } catch {
      console.log('Non JSON response:', text);
      return null;
    }

  } catch (error) {
    console.log('Add Invoice Error:', error);
    return null;
  } finally {
    setLoading(false);
  }
};



const objectToFormData = (obj: any) => {
  const formData = new FormData();

  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (value === null || value === undefined) return;

    // Image / File handling
    if (typeof value === 'object' && value?.path) {
      formData.append(key, {
        uri: value.path,
        type: value.mime || 'image/jpeg',
        name: value.filename || `${key}.jpg`,
      } as any);
    }

    // Array handling
    else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, String(item));
      });
    }

    // Normal fields
    else {
      formData.append(key, String(value));
    }
  });

  return formData;
};
