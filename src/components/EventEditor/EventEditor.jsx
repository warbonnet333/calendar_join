import React, {useEffect, useState, useRef} from "react"
import {connect} from "react-redux";
import Radium, {Style} from 'radium';
import {formatDate, formatToLocalDate, getTimeFromDate, updateFieldsInObj} from '../../helpers/fomats'
import {showEditor, closeEditor} from "../../redux/modal/modalActions";
import {addEvent, editEvent, deleteEvent} from "../../redux/events/eventsActions";

// import st from './event_editor.css'

const EventEditor = props => {
    // const targetRef = React.createRef();
    const targetRef = useRef(null)

    // Перевірка чи нова подія чи потрібно радагувати
    const isEditorForNewEvent = props.selectedSlot.slots[0];

    const initialState = {
        eventName: isEditorForNewEvent ? '' : props.selectedSlot.eventInfo.title,
        eventDate: isEditorForNewEvent ? formatDate(props.selectedSlot.slots[0]) : formatDate(props.selectedSlot.eventInfo.start),
        eventTime: isEditorForNewEvent ? '' : getTimeFromDate(props.selectedSlot.eventInfo.start),
        notes: isEditorForNewEvent ? '' : props.selectedSlot.eventInfo.notes,
        color: isEditorForNewEvent ? 'blue' : props.selectedSlot.eventInfo.color,
    }

    const [state, setState] = useState(initialState)
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isErrorShown, setShownErrors] = useState(false)

    let position = {
        absolute: {
            left: props.selectedSlot.bounds.clientX + 'px',
            top: props.selectedSlot.bounds.clientY + 10 + 'px',
        }
    }

    const onHandlerChande = (e) => {
        setState(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        // Перевірка на валідність полів
        if (!onHandleValidation()) {
            setShownErrors(true);
            return;
        } else {
            setShownErrors(false)
        }

        if (!isEditorForNewEvent) {
            onEditForm();
            return;
        }

        // Створюємо подію
        const eventToAdd = {
            title: eventName,
            start: formatToLocalDate(eventDate, eventTime),
            end: formatToLocalDate(eventDate, eventTime, 1),
            // allDay?: boolean
            notes: notes,
            color: color,
            id: Date.now()
        }

        props.addEvent(eventToAdd)
        onCloseEditor();
    }

    // Форматування події
    const onEditForm = () => {
        const eventsList = props.eventsList;
        const idToEdit = props.selectedSlot.eventInfo.id;

        const objIndex = eventsList.findIndex(el => el.id === idToEdit)

        // Створюємо подію
        const eventToAdd = {
            title: eventName,
            start: formatToLocalDate(eventDate, eventTime),
            end: formatToLocalDate(eventDate, eventTime, 1),
            notes: notes,
            color: color,
        }

        const newFieldsObj = updateFieldsInObj(eventsList[objIndex], eventToAdd);

        const updatedObj = {...eventsList[objIndex], ...newFieldsObj}

        const updatedList = [
            ...eventsList.slice(0, objIndex),
            updatedObj,
            ...eventsList.slice(objIndex + 1),
        ];

        props.editEvent(updatedList);
        onCloseEditor();
    }

    const onCloseEditor = () => {
        props.closeEditor();
        setState(initialState);
    }

    // Валідація полів
    const onHandleValidation = () => {
        let formIsValid = true;
        let errors = {};

        //Name
        if (state["eventName"].length < 1) {
            formIsValid = false;
            errors["eventName"] = "Cannot be empty";
        }

        //Date
        if (state["eventDate"].length < 1) {
            formIsValid = false;
            errors["eventDate"] = "Cannot be empty";
        }
        //Name
        if (state["eventTime"].length < 1) {
            formIsValid = false;
            errors["eventTime"] = "Cannot be empty";
        }

        setFieldsErrors(errors);
        return formIsValid;
    }

    // Видалення події
    const onDeleteEvent = () => {
        const eventIdToDelete = props.selectedSlot.eventInfo.id;

        props.deleteEvent(eventIdToDelete);
        onCloseEditor();
    }

    useEffect(() => {
        targetRef.current?.scrollIntoView({behavior: "smooth"});
    })

    const {eventName, eventDate, eventTime, notes, color} = state;
    return (
        <div className='editor'
             style={[position.absolute]}
             ref={targetRef}
        >
            <form onSubmit={onSubmitForm}>
                <button onClick={onCloseEditor} type='button' className='close_btn'></button>
                <div className='input_wrapper'>
                    <label htmlFor="eventName">Title</label>
                    <input id="eventName" type="text" name="eventName"
                           placeholder="eventName" value={eventName} onChange={onHandlerChande}/>
                    {fieldsErrors['eventName'] && isErrorShown &&
                    <span className='error_span'>{fieldsErrors['eventName']}</span>}
                </div>
                <div className='input_wrapper'>
                    <label htmlFor="eventDate">Date</label>
                    <input id="eventDate" type="date" name="eventDate"
                           placeholder="eventDate" value={eventDate} onChange={onHandlerChande}/>
                    {fieldsErrors['eventDate'] && isErrorShown &&
                    <span className='error_span'>{fieldsErrors['eventDate']}</span>}
                </div>
                <div className='input_wrapper'>
                    <label htmlFor="eventTime">Time</label>
                    <input id="eventTime" type="time" name="eventTime"
                           placeholder="eventTime" value={eventTime} onChange={onHandlerChande}/>
                    {fieldsErrors['eventTime'] && isErrorShown &&
                    <span className='error_span'>{fieldsErrors['eventTime']}</span>}
                </div>
                <div className='input_wrapper'>
                    <label htmlFor="notes">Notes</label>
                    <input id="notes" type="text" name="notes"
                           placeholder="notes" value={notes} onChange={onHandlerChande}/>
                </div>
                <div className='input_wrapper'>
                    <label htmlFor="color">Color</label>
                    <select name="color" id="color" value={color} onChange={onHandlerChande}>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                    </select>

                </div>

                <div className="editor_bottom">
                    {isEditorForNewEvent
                        ? <button onClick={onCloseEditor} type='button' className='cancel_btn'>Cancel</button>
                        : <button onClick={onDeleteEvent} type='button' className='cancel_btn'>Delete</button>
                    }
                    <button onClick={onSubmitForm} type='button' className='save_btn'>Save</button>
                </div>
            </form>
        </div>
    );
};

const mSTP = state => ({
    eventsList: state.events
})

const mDTP = dispatch => ({
    closeEditor: () => dispatch(closeEditor()),
    addEvent: (eventToAdd) => dispatch(addEvent(eventToAdd)),
    editEvent: (updatedList) => dispatch(editEvent(updatedList)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
})

export default connect(mSTP, mDTP)(Radium(EventEditor));