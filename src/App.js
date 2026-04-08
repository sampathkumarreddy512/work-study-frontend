import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5000/api';

// Auth Context
const AuthContext = createContext(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Auth Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    
// Private Route Component
function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;
  return children;
}

// Login Component
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
// Register Component
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  
// Jobs Component
function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs`);
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
    setLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/jobs`, { title, description, location });
      setTitle('');
      setDescription('');
      setLocation('');
      fetchJobs();
    } catch (err) {
      console.error('Error creating job:', err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await axios.post(`${API_URL}/applications`, { jobId, status: 'pending' });
      alert('Application submitted!');
    } catch (err) {
      console.error('Error applying:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Work-Study Jobs</h2>
      {user?.role === 'admin' && (
        <form onSubmit={handleCreate}>
          <h3>Create New Job</h3>
        
// Applications Component
function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API_URL}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
    setLoading(false);
  };

  const updateStatus = async (appId, status) => {
    try {
      await axios.put(`${API_URL}/applications/${appId}`, { status });
      fetchApplications();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    
// Dashboard Component
function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}!</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
      <nav className="dashboard-nav">
        {user?.role === 'admin' && <Link to="/jobs">Manage Jobs</Link>}
        {user?.role === 'student' && <Link to="/jobs">Browse Jobs</Link>}
        <Link to="/applications">My Applications</Link>
      </nav>
    </div>
  );
}

// Home Component
function Home() {
  const { user } = useAuth();
  return (
    <div className="container home">
      <h1>Work-Study Management System</h1>
      <p>Connect students with work-study opportunities</p>
      {!user ? (
        <div>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      ) : (
        <Link to="/dashboard" className="btn">Go to Dashboard</Link>
      )}
    </div>
  );
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <header className="header">
            <h1><Link to="/">Work-Study Portal</Link></h1>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/jobs">Jobs</Link>
              <Link to="/applications">Applications</Link>
              <Link to="/dashboard">Dashboard</Link>
            </nav>
          </header>
          <main className="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
              <Route path="/applications" element={<PrivateRoute><Applications /></PrivateRoute>} />
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; 2024 Work-Study Management System</p>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
    <div className="container">
      <h2>Applications</h2>
      <div className="applications-list">
        {applications.map((app) => (
          <div key={app._id} className="application-card">
            <p><strong>Job:</strong> {app.jobId?.title || 'Unknown'}</p>
            <p><strong>Applicant:</strong> {app.userId?.name || 'Unknown'}</p>
            <p><strong>Status:</strong> {app.status}</p>
            {user?.role === 'admin' && (
              <div>
                <button onClick={() => updateStatus(app._id, 'approved')}>Approve</button>
                <button onClick={() => updateStatus(app._id, 'rejected')}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
          <button type="submit">Create Job</button>
        </form>
      )}
      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            {user?.role === 'student' && <button onClick={() => handleApply(job._id)}>Apply</button>}
            {user?.role === 'admin' && <button>Delete</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
    localStorage.setItem('user', JSON.stringify(res.data.user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data.user);
  };

  const register = async (name, email, password, role) => {
    const res = await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
