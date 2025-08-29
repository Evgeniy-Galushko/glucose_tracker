import { lazy, Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

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

  const MeasurementSchedule = lazy(() =>
    import("../components/MeasurementSchedule/MeasurementSchedule.jsx")
  );

  const AllDimensions = lazy(() =>
    import("../components/AllDimensions/AllDimensions.jsx")
  );

  return (
    <Suspense fallback={"loading"}>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/tracker/" element={<TrackerPage />}>
          <Route index element={<Navigate to="charts" replace />} />
          <Route path="charts" element={<MeasurementSchedule />} />
          <Route path="all_dimensions" element={<AllDimensions />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
