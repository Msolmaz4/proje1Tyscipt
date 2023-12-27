import { Navigate, Outlet } from "react-router-dom";

const AutLayout = () => {
  const isAuthenticated = false;
  return (
    <div>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </div>
  );
};

export default AutLayout;
