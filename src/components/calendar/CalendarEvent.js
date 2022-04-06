import React from 'react'

export const CalendarEvent = ({ event }) => {
  const { title, notes } = event

  return (
    <>
      <strong className=''>{title}</strong>
      <span className='mb-1 mt-1'> {notes} </span>
      <hr/>
    
    </>
  )
}
