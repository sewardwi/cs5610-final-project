import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: any }) {
  const user = localStorage.getItem('user');
        if (user) {
          return children;
        }else{
          return <Navigate to="/login" />;
        }
 }
