import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { eventStartDelete } from '../../actions/events';


export const DeleteEventFab = () => {

    const dispatch = useDispatch()
    const {activeEvent} = useSelector((state) => state.calendar)

    const handleClickDelete = () => {
      
        Swal.fire({
            title: 'Estas seguro/a?',
            text: "La nota se eliminara permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
            if (result.value) {
                dispatch(eventStartDelete(activeEvent))
            }else {
              return
            }
        })
        
    }
    
  return (
    <button
        className={ ` ${activeEvent? 'fixed bottom-16 animate__animated animate__fadeInUpBig right-12 mb-4 mr-12 py-3 px-4 ease-in-out duration-300 z-40 hover:scale-125 transform-gpu bg-red-500 text-white rounded-full shadow-md shadow-red-500/50 hover:bg-red-600 hover:shadow-red-600/60 focus:outline-none': 'animate__animated animate__fadeInDownBig' }`}
        onClick={handleClickDelete}
    >
        <i className='fas fa-trash'></i>
    </button>
  )
}
