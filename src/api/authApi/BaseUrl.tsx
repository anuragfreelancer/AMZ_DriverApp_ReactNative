import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BaseUrl } from "./AuthApi";


 export const IMAGE_BASE_URL = "https://api.addvey.com/api/public/";

const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient; 


// export const onNavgation  = useNavigation()