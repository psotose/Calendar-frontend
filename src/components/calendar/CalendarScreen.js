import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendarMessagesEs";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

import { uiOpenModal } from "../../actions/ui";
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector( state => state.auth );
  const [lastView, setslastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch( eventStartLoading() )
  }, [dispatch])

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch( eventSetActive( e ) );
  };

  const onViewChange = (e) => {
    setslastView(e);
    localStorage.setItem("lastView", e);
  };

  // para que al hacer click en cualquier parte del calendario se abra el popup
  //falta implementar
  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: ( uid === event.user._id ) ? "#367CF7" : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{ event: CalendarEvent }}
      />

      <AddNewFab />
      { activeEvent && <DeleteEventFab /> }

      <CalendarModal />
    </div>
  );
};
