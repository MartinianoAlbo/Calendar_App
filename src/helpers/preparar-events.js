import moment from 'moment'

//convertir la fecha de string a date con moment
export const prepararEvents = (events = []) => {

    return events.map( event => ({
        ...event,
        end:moment(event.end).toDate(),
        start:moment(event.start).toDate()
    }))
}