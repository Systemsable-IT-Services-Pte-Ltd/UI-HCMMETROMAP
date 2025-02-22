import loader from "@loadable/component";

export const ErrorLayout = loader(() => import("@layouts/ErrorLayout"));
export const MainLayout = loader(() => import("@layouts/MainLayout"));
export const Home = loader(() => import("@pages/Home"));
export const Contact = loader(() => import("@pages/Contact"));
