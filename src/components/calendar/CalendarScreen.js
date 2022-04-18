import React, { useEffect, useState }  from 'react'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'
import { messages } from '../../helpers/calendar-messages-span'
import { CalendarEvent } from './CalendarEvent'
import {CalendarModal} from '../calendar/CalendarModal'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'
import {uiOpenModal} from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import { eventClearActiveEvent } from '../../actions/events'
import { eventStartLoading } from '../../actions/events'

moment.locale('es')
const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector((state) => state.calendar)
  const {uid} = useSelector((state) => state.AUTH)


  useEffect(() => {
    dispatch(eventStartLoading())
  
  }, [dispatch])
  

  const onDoubleClick = () => {
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }

  const onOutEventClick = (e) => {
    dispatch(eventClearActiveEvent())
  }

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const style = {
      backgroundColor:(uid === event.user._id)? '#367CF7' : '#45660E',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return {
      style,
    }
  }
  return (
    <>

      <Navbar />
      <div className="container mx-auto mt-6 calendar-screen">
        <Calendar
          localizer={localizer} // formato de hora y fecha
          events={events}//recibe el evento
          startAccessor="start"
          endAccessor="end"
          messages={messages} //mensajes en español
          eventPropGetter={eventStyleGetter} // recibe props de eventos del calendario
          view={lastView}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={onOutEventClick}
          selectable={true}
          components={{
            event: CalendarEvent,
          }} // editar la froma de eventos en el calendario
        />
      </div>

      <AddNewFab />
      {
        activeEvent && <DeleteEventFab />
      }
      <CalendarModal />
    </>
  )
}
