import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to= "/admin-dashboard"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route
  path="/admin-dashboard"
  element={
    <PrivateRoutes>
      <RoleBasedRoutes requiredRole={["admin"]}>
        <AdminDashboard />
      </RoleBasedRoutes>
    </PrivateRoutes>
  }>
    <Route index element={<AdminSummary/>}></Route>
    <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
  </Route>

        <Route path='/employee-dashboard' element={<EmployeeDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
