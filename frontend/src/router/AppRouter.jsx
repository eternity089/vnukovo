import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Home from "../pages/Home/Home.jsx";
import Cabinet from "../pages/Cabinet/Cabinet.jsx";
import Services from "../pages/Services/Services.jsx";
import History from "../pages/History/History.jsx";
import Gallery from "../pages/Gallery/Gallery.jsx";
import Contacts from "../pages/Contacts/Contacts.jsx";
import Rules from "../pages/Rules/Rules.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import PrivacyPolicy from "../pages/Documentation/PrivacyPolicy.jsx";

export const createAppRouter = (user, loading) =>
    createBrowserRouter([
        {
            path: "/",
            element: <MainLayout user={user} />,

            children: [
                { index: true, element: <Home />},
                { path: 'services', element: <Services user={user}/>},
                { path: 'history', element: <History />},
                { path: 'gallery', element: <Gallery />},
                { path: 'contacts', element: <Contacts />},
                { path: 'rules', element: <Rules />},
                {path: 'privacy_policy', element: <PrivacyPolicy/>},
                {
                    path: "cabinet",
                  element: (
                      <ProtectedRoute user={user} loading={loading}>
                        <Cabinet/>
                      </ProtectedRoute>
                  )
                },
                { path: "*", element: <NotFound /> }
            ]
        }
    ]);