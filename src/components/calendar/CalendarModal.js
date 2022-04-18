import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import moment from 'moment'
import { uiCloseModal } from '../../actions/ui'
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate
} from '../../actions/events'
import DateTimePicker from 'react-datetime-picker'
import Swal from 'sweetalert2'

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// }

Modal.setAppElement('#root') //vincula el modal al elemento del DOM que se le pase

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlus1 = now.clone().add(1, 'hours')

const initState = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlus1.toDate(),
}


export const CalendarModal = () => {
  const [dateStart, setDateStart] = useState(now.toDate())
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
  const [inputAlert, setInputAlert] = useState(false)
  const { modalOpen } = useSelector((state) => state.UI)
  const { activeEvent } = useSelector((state) => state.calendar)
  const [formValues, setFormValues] = useState(initState)
  const dispatch = useDispatch()

  const { title, notes, start, end } = formValues



  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent)
    } else {
      setFormValues(initState)
    }
  }, [activeEvent, setFormValues])

  const closeModal = (e) => {
    dispatch(uiCloseModal())
    dispatch(eventClearActiveEvent())
    setFormValues(initState)
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const handleDateStartChange = (e) => {
    setDateStart(e)
    setFormValues({
      ...formValues,
      start: e,
    })
  }

  const handleDateEndChange = (e) => {
    setDateEnd(e)
    setFormValues({
      ...formValues,
      end: e,
    })
  }

  const resetForm = () => {
    setFormValues(initState)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const momentStart = moment(start)
    const momentEnd = moment(end)

    if (title.trim() === '') {
      setInputAlert(true)
      return Swal.fire('Debes colocar un titulo')
    }

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        'Error',
        'La fecha de inicio debe ser menor a la fecha de fin',
        'error',
      )
    }    

    if (activeEvent) {
      Swal.fire({
        title: 'Estas seguro/a?',
        text: "La nota no se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#298701',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Modificar'
        }).then((result) => {
        if (result.value) {
          dispatch(eventStartUpdate(formValues))
        }else {
          return
        }
    })
      
    } else {
      dispatch(
        eventStartAddNew(formValues),
      )
    }

    setInputAlert(false)
    closeModal()
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        className="modal"
        closeTimeoutMS={200}
        overlayClassName="modal-fondo"
      >
        <h1 className="italic font-bold text-lg">{activeEvent? title : 'Nuevo Evento'}</h1>
        <hr />
        <form className="container mx-auto" onSubmit={handleSubmit}>
          <div className="mt-3">
            <label
              htmlFor="fecha_inicio"
              className="block text-sm font-medium text-gray-700"
            >
              Hora y fecha de inicio
            </label>

            <div className="mt-1 relative rounded-md shadow-sm">
              <DateTimePicker
                className="block w-full p-1 sm:text-sm border-gray-300 shadow-lg shadow-gray-300/50 rounded-md"
                onChange={handleDateStartChange}
                value={start}
              />
            </div>
          </div>
          <div className="mt-3">
            <label
              htmlFor="date-fin"
              className="block text-sm font-medium text-gray-700"
            >
              Hora y fecha fin
            </label>

            <div className="mt-1 relative rounded-md shadow-sm">
              <DateTimePicker
                className={`block w-full p-1 sm:text-sm border-gray-300 shadow-lg shadow-gray-300/50 rounded-md ${
                  inputAlert && 'required:border-red-500'
                }`}
                onChange={handleDateEndChange}
                value={end}
                required
                minDate={dateStart} //fecha minima
              />
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Titulo
            </label>

            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="title"
                id="title"
                className={`block focus:outline-none w-full p-1 sm:text-sm border border-gray-300 shadow-lg shadow-gray-300/50 rounded-md ${
                  inputAlert && 'required:border-red-500'
                }`}
                required
                placeholder="Titulo de la nota"
                value={title}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Descripcion corta
            </label>

            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                type="text"
                name="notes"
                id="notes"
                className="block w-full p-1 sm:text-sm border border-gray-300 shadow-lg shadow-gray-300/50 rounded-md focus:outline-none"
                placeholder="Breve descripcion"
                cols="10"
                rows="5"
                value={notes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="mt-1 relative rounded-md shadow-sm">
              <button
                type="submit"
                className="bg-blue-500 shadow-lg hover:bg-blue-600 hover:ease-in duration-200 hover:shadow-blue-600/60 shadow-blue-500/50 text-white px-2 py-1 w-full rounded-md"
              >
                <i className="far fa-save"></i> { activeEvent? 'Guardar Cambios' : 'Guardar' } 
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
