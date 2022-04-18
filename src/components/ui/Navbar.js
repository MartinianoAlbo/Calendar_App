import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { startLogout } from "../../actions/auth"

export const Navbar = () => {

  const dispatch = useDispatch()
  const {name} = useSelector((state) => state.AUTH)

  const handleLogout = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Cerrar Sesion',
      text: "confirma para cerrar sesion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1A71BF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      cancelButtonText: 'No'
      }).then((result) => {
      if (result.value) {
        dispatch(startLogout())
      }else {
        return
      }
  })
  
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center text-white text-lg">
              {/* <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              /> */}
              <i className="fa fa-calendar-day"></i>
              <h1 className="m-2">Agenda de {name}</h1>
            </div>
            {/* <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="#"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Dashboard
                </Link>

                <Link
                  to="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Team
                </Link>

                <Link
                  to="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Projects
                </Link>

                <Link
                  to="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Calendar
                </Link>
              </div>
            </div> */}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* <!-- Profile dropdown --> */}
            <div className="ml-3 relative">
              <div className=''>
                <button
                  type="button"
                  className="text-red-700 flex items-center font-bold border-2 p-1 border-red-700 rounded-md flex text-sm hover:bg-red-700 hover:text-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={handleLogout}
                > 
                <i className='fas fa-sign-out-alt mx-1'></i>
                {' '}
                <span>Salir</span> 
                  
                  {/* <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> */}
                </button>
              </div>

              {/* <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-1"
                >
                  Settings
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                >
                  Sign out
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </Link>

          <Link
            to="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </Link>

          <Link
            to="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </Link>

          <Link
            to="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </Link>
        </div>
      </div> */}
    </nav>
  )
}
