import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarWithLogo from "./navbar-with-logo";

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Homepage
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This is your homepage content. The logo in the navbar will bring
            users back here.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Homepage Content
            </h2>
            <p className="text-gray-600">
              Add your homepage content here. Users can click the logo to return
              to this page from anywhere on your site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Other page component
function OtherPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Other Page</h1>
          <p className="text-xl text-gray-600">
            Click the logo to go back to the homepage!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <NavbarWithLogo />
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/other" element={<OtherPage />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}
