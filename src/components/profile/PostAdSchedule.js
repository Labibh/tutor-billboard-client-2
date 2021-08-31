import React from "react";
import { Table as TableBS, Button } from "react-bootstrap";
import "./PostAd.css";

const columns = [
  { heading: "Day", id: 1 },
  { heading: "Morning", id: 2 },
  { heading: "Afternoon", id: 3 },
  { heading: "Evening", id: 4 },
];

const Schedule = (props) => (
  <div>
    <h3>Availability</h3>
    <Table
      columns={columns}
      data={props.availability}
      HAC={props.handleAvailabilityChange}
    />
  </div>
);

function TableRow(item, index, HAC) {
  var rows = [];
  for (var i = 0; i <= 3; i++) {
    if (Object.keys(item)[i] === "day") {
      rows.push(<td key={`${item.day}-${item.id}`}>{item.day}</td>);
    } else {
      const timeLetter = Object.keys(item)[i];
      var booked = "";
      if (item[timeLetter] === true) {
        booked = "success";
      } else {
        booked = "danger";
      }
      rows.push(
        <td
          key={`${Object.keys(item)[i]}-${item.id}`}
          style={{ padding: "3px" }}
        >
          <Button
            variant={booked}
            className="avail-button"
            onClick={() => HAC(timeLetter, index)}
          ></Button>
        </td>
      );
    }
  }
  return rows;
}

const Table = ({ columns, data, HAC }) => (
  <TableBS responsive bordered hover variant="dark">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.id}>{col.heading}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={`${item.day}-row`}>{TableRow(item, index, HAC)}</tr>
      ))}
    </tbody>
  </TableBS>
);

export default Schedule;
