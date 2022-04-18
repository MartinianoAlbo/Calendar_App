import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepararEvents } from "../helpers/preparar-events";
import { types } from "../types/types";


export const eventStartAddNew = event => {
    return async(dispatch, getState) => {

        const {uid, name} = getState().AUTH
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json()
            console.log(body);
            if(body.ok){
                event.id = body.eventoGuardaro.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error);
        }
    

        

    }
}

const eventAddNew = (event) => ({
 type: types.eventAddNew,
 payload: event   
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event) => {
    
    return async(dispatch) => {
        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json()
        
            if(body.ok){
                dispatch(eventUpdated(body.eventoActualizado));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}
    
const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventStartDelete = () => {
    return async(dispatch, getState) => {
        const {activeEvent} = getState().calendar;
        try {
            const resp = await fetchConToken(`events/${activeEvent.id}`, {}, 'DELETE');
            const body = await resp.json()
            console.log(body);
            if(body.ok){
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDelete
});

export const eventStartLoading = () => {
    return async(dispatch, getState) => {

         try {
            const resp = await fetchConToken(`events`);
            const body = await resp.json();
            const events = prepararEvents(body.event);

            dispatch(eventLoaded(events));
            
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})