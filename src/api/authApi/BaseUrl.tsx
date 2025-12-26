import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BaseUrl } from "./AuthApi";


 export const IMAGE_BASE_URL = "http://server-php-8-3.technorizen.com/car_dealership/api/";

const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; 


// export const onNavgation  = useNavigation()