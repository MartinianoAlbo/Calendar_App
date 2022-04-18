
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoutes = ({children}) => {

  const { uid } = useSelector((state) => state.AUTH)

  return !!uid ?  children : <Navigate to={'/login'}/>;

}

  
