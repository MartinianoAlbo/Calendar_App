import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'


export const PublicRoutes = ({children}) => {

  const { uid } = useSelector((state) => state.AUTH)
  
  return !!uid ? (<Navigate to={'/'} />) : children;

}
