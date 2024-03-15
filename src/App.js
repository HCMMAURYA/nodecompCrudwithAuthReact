import Footer from './component/footer/footer';
import Header from './component/header/header';
import ProtectedRoute from './component/protectedRoute/protecteRoute';
import Dashboard from './pages/dashboard/dashboard';
import Edit from './pages/edit/edit';
import LoginForm from './pages/login/login';
import Registration from './pages/registration/registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />

				<Routes>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/edit" element={<Edit />} />
					<Route
						path="/dashboard"
						element={<ProtectedRoute Component={Dashboard} />}
					/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
