import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  const HomePages = lazy(() => import("../pages/HomePages/HomePages.jsx"));
  const SignUpPage = lazy(() => import("../pages/SignUpPage/SignUpPage.jsx"));
  const NotFoundPage = lazy(() =>
    import("../pages/NotFoundPage/NotFoundPage.jsx")
  );
  const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage.jsx"));
  const TrackerPage = lazy(() =>
    import("../pages/TrackerPage/TrackerPage.jsx")
  );

  const AllDimensionsPage = lazy(() =>
    import("../pages/AllDimensionsPage/AllDimensionsPage.jsx")
  );

  return (
    <Suspense fallback={"loading"}>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/allDimensions" element={<AllDimensionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
