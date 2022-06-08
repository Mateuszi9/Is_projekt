const AuthWrapper = () => {
    const location = useLocation();
    const token = !!JSON.parse(localStorage.getItem("token"));

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};