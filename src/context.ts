import {createContext} from "react";
import type { BrowserUser } from "./types";


const UserContext = createContext<BrowserUser | null>(null);
export const IsLoggedInContext = createContext<boolean>(false);

export default UserContext;