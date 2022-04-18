import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startRegister } from '../../actions/auth'
import Swal from 'sweetalert2'

export const RegisterScreen = () => {
  const [ formRegisterValues, handleRegisterInputChange, resetInput ] = useForm({
    rName: '',
    rEmail: '',
    rPassword: '',
    rPasswordConfirm: ''
  })

  const dispatch = useDispatch();

  const { rName, rEmail, rPassword, rPasswordConfirm } = formRegisterValues;

  const handleRegister = (e) => {
    e.preventDefault();
    
    if(rPassword !== rPasswordConfirm){
      return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      
    }
    dispatch(startRegister(rName, rEmail, rPassword));
    Swal.fire('Registro', 'Usuario registrado correctamente', 'success');
    resetInput()
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Crea una cuenta 
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">

            <div>
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre"
                  value={rName}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={rEmail}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={rPassword}
                  onChange={handleRegisterInputChange}
                />
              </div>

              <div>
                <label htmlFor="repetir_password" className="sr-only">
                  Repetir Password
                </label>
                <input
                  id="repetir_password"
                  name="repetir_password"
                  type="password"
                  autoComplete="off"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Repetir Password"
                  value={rPasswordConfirm}
                  onChange={handleRegisterInputChange}
                />
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Crear Cuenta
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}
