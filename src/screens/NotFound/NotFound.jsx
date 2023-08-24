import "./notFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigateTo = useNavigate();

  return (
    <div className="notFoundScreen">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <button onClick={() => navigateTo("/")}>Go Home</button>
    </div>
  );
};

export default NotFound;
