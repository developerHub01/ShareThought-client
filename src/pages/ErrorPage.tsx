import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;
  return (
    <div>
      <p>{error.message || "Something went wrong"}</p>
    </div>
  );
};

export default ErrorPage;
