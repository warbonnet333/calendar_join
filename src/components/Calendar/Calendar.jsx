import React, {useState} from "react"
import {Calendar, momentLocalizer} from 'react-big-calendar';
import EventEditor from '../EventEditor/EventEditor';
import moment from 'moment';
import {connect} from 'react-redux';
import {showEditor, closeEditor} from "../../redux/modal/modalActions";

const localizer = momentLocalizer(moment)

const MyCalendar = props => {
    const initialSelectedSlot = {
        bounds: {},
        slots: []
    }

    const [selectedSlot, setSelectedSlot] = useState(initialSelectedSlot);

    const onCalendarClick = (e, sec) => {
        if (props.isEditorOpened) {
            props.closeEditor();
            return;
        }
        props.closeEditor();

        setSelectedSlot({
            bounds: {
                clientX: e.box ? e.box.clientX : e.bounds.left,
                clientY: e.box ? e.box.clientY : e.bounds.top,
            },
            slots: e.slots,

        })
        props.openEditor();
    }

    const onEventClick = (e, eSec) => {
        if (props.isEditorOpened) {
            props.closeEditor();
            return;
        }
        props.closeEditor();

        setSelectedSlot({
            bounds: {
                clientX: eSec.pageX,
                clientY: eSec.pageY,
            },
            slots: [false],
            eventInfo: {
                title: e.title,
                start: e.start,
                end: e.end,
                notes: e.notes,
                color: e.color,
                id: e.id
            }
        })
        props.openEditor();
    }

    const showTooltip = (e) => {
        return e.notes
    }

    const onCloseEditor = () => {
        props.closeEditor();
    }

    const addEventStyles = (event) => {
        return {
            style: {
                backgroundColor: event.color,
                color: '#fff',
                padding: '8px 12px'
            }
        }
    }

    const addDayStyles = (date) => {

        return {
            className: 'day_item',
        }
    }

    return (
        <div className='calendar'>
            {props.isEditorOpened && <EventEditor eventsList={props.eventsList} selectedSlot={selectedSlot}/>}
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={props.eventsList}
                style={{height: "90vh"}}
                selectable={true}
                onSelectSlot={onCalendarClick}
                onSelectEvent={onEventClick}
                onNavigate={onCloseEditor}
                onView={onCloseEditor}
                onRangeChange={onCloseEditor}
                tooltipAccessor={showTooltip}
                eventPropGetter={addEventStyles}
                dayPropGetter={addDayStyles}
            />

        </div>
    );
}

const mSTP = state => ({
    isEditorOpened: state.modals.isEditorShown,
    eventsList: state.events
});

const mDTP = dispatch => ({
    openEditor: () => dispatch(showEditor()),
    closeEditor: () => dispatch(closeEditor())
});

export default connect(mSTP, mDTP)(MyCalendar);