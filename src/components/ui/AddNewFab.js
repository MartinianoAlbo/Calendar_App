import {useDispatch} from 'react-redux'
import { uiOpenModal } from '../../actions/ui'


export const AddNewFab = () => {

  const dispatch = useDispatch()

  const handleClickNew = (e) => {
    e.preventDefault()
    dispatch(uiOpenModal())
  }
  return (
    <button
        className='animate__animated animate__fadeInUp  fixed bottom-0 right-12 mb-4 mr-12 py-3 px-4  ease-in-out duration-300 z-10 transform-gpu bg-blue-500 text-white rounded-full shadow-md shadow-blue-500/50 hover:bg-blue-600 hover:shadow-blue-600/60 scale-175 focus:outline-none'
        onClick={handleClickNew}
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
