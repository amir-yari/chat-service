import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to ChatApp</h1>
      <p>Your secure platform for communication.</p>
      <Link to="/auth/login">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default LandingPage;
