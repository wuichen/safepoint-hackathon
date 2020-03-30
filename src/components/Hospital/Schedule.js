import React from "react";
import { Calendar, Badge, Modal } from "antd";
import "./Schedule.css";

function appointment() {
  Modal.info({
    title: "Online Appointment",
    content: (
      <div>
        <p>Would you like to start an online appointment with the patient?</p>
      </div>
    ),
    onOk() {
      window.open(
        "https://safepoint.daily.co/hello",
        "MsgWindow",
        "width=500,height=700"
      );
    }
  });
}

function getListData(value) {
  let listData;
  switch (value.date()) {
    case 3:
      listData = [
        { type: "warning", content: "Offline Appointment." },
        { type: "success", content: "Test" }
      ];
      break;
    case 8:
      listData = [
        { type: "warning", content: "Offline Appointment." },
        { type: "success", content: "Test" }
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Online Appointment." },
        { type: "warning", content: "Offline Appointment." },
        { type: "warning", content: "Online Appointment." },
        { type: "warning", content: "Online Appointment." },
        { type: "warning", content: "Online Appointment." },
        { type: "success", content: "Test" }
      ];
      break;
    case 15:
      listData = [{ type: "warning", content: "Appointment" }];
      break;
    default:
  }
  return listData || [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li onClick={() => appointment()} key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const Schedule = () => {
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
};

export default Schedule;
