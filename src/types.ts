import { RouteComponentProps } from "react-router";
import { setDarkMode } from "./data/user/user.actions";

// Menu Interfaces
export interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
export interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
}

export interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

export interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }


