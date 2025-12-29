import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BaseUrl } from "./AuthApi";


 export const IMAGE_BASE_URL = "https://server-php-8-3.technorizen.com/amz_pro/api/auth/";

const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; 


// export const onNavgation  = useNavigation()