import React, { Component } from "react";
import "./TimeTable.css";

const INTERVAL_MINUTES = 15;

const days = {
  [0]: "Monday",
  [1]: "Tuesday",
  [2]: "Wednesday",
  [3]: "Thursday",
  [4]: "Friday",
  [5]: "Saturday",
  [6]: "Sunday"
};

// const openingHours = [
//   {
//     close: { day: 1, time: "0000", hours: 0, minutes: 0 },
//     open: { day: 0, time: "1500", hours: 15, minutes: 0 }
//   },
//   {
//     close: { day: 2, time: "0000", hours: 0, minutes: 0 },
//     open: { day: 1, time: "1600", hours: 16, minutes: 0 }
//   },
//   {
//     close: { day: 3, time: "0000", hours: 0, minutes: 0 },
//     open: { day: 2, time: "1600", hours: 16, minutes: 0 }
//   },
//   {
//     close: { day: 4, time: "0000", hours: 0, minutes: 0 },
//     open: { day: 3, time: "1600", hours: 16, minutes: 0 }
//   },
//   {
//     close: { day: 5, time: "0100", hours: 1, minutes: 0 },
//     open: { day: 4, time: "1600", hours: 16, minutes: 0 }
//   },
//   {
//     close: { day: 6, time: "0300", hours: 3, minutes: 0 },
//     open: { day: 5, time: "1400", hours: 14, minutes: 0 }
//   },
//   {
//     close: { day: 0, time: "0300", hours: 3, minutes: 0 },
//     open: { day: 6, time: "1200", hours: 12, minutes: 0 }
//   }
// ];

class TimeTable extends Component {
  render() {
    const { deals, openingHours } = this.props;
    console.log("yoooo deals", deals);

    let dayLabel = -1;
    let index = 0;
    let isOpen = false;
    let isDeal = false;

    const { times, dealTimes, openingTimes } = getTimesAndDeals(
      openingHours,
      deals
    );

    return (
      <table className="timetable">
        <tr>
          <td></td>
          {times.map(i => {
            if (i % (24 * (60 / INTERVAL_MINUTES)) === 0) dayLabel++;
            return (
              i % (24 * (60 / INTERVAL_MINUTES)) === 0 && (
                <th colspan={`${24 * (60 / INTERVAL_MINUTES)}`}>
                  {days[dayLabel]}
                </th>
              )
            );
          })}
        </tr>
        <tr>
          <td>Opening Times</td>
          {times.map(i => {
            if (openingTimes[index] === i) {
              isOpen = !isOpen;
              index++;
            }
            return <td id={i} className={isOpen && "isOpen"}></td>;
          })}
        </tr>
        {dealTimes.map((deal, x) => {
          index = 0;
          return (
            <tr>
              <td>{`Deal ${x + 1}`}</td>
              {times.map(i => {
                if (deal[index] === i) {
                  isDeal = !isDeal;
                  index++;
                }
                return <td className={isDeal && "isDeal"}></td>;
              })}
            </tr>
          );
        })}
      </table>
    );
  }
}

export default TimeTable;

export const checkIsOpen = (rawOpeningHours, rawDeals) => {
  let openIndex = 0;
  let dealIndex = 0;
  let isOpen = false;
  let isDeal = false;
  let error = false;

  const { times, dealTimes, openingTimes } = getTimesAndDeals(
    rawOpeningHours,
    rawDeals
  );

  dealTimes.map(deal => {
    openIndex = 0;
    dealIndex = 0;
    isOpen = false;
    isDeal = false;
    times.map(i => {
      if (openingTimes[openIndex] === i) {
        console.log("yoooo isopen", i, !isOpen);
        isOpen = !isOpen;
        openIndex++;
      }
      if (deal[dealIndex] === i) {
        console.log("yoooo isdeal", i, !isDeal);
        isDeal = !isDeal;
        dealIndex++;
      }
      if (!isOpen && isDeal) {
        console.log("yoooo errorr", i);
        error = true;
      }
    });
  });

  if (error) {
    window.alert("Check Times!");
    return false;
  } else {
    window.alert("All good");
    return true;
  }
};

const getTimesAndDeals = (rawOpeningHours, rawDeals) => {
  let times = [];
  let dealTimes = [];
  let openingYo = [];

  for (let i = 0; i < (60 / INTERVAL_MINUTES) * 24 * 7; i++) {
    times.push(i);
  }

  rawOpeningHours &&
    rawOpeningHours.map(day => {
      if (day.open) {
        const offset = day.open.day * (60 / INTERVAL_MINUTES) * 24;
        openingYo.push(offset + day.open.hours * (60 / INTERVAL_MINUTES));
      }
      if (day.close) {
        const offset = day.close.day * (60 / INTERVAL_MINUTES) * 24;
        openingYo.push(offset + day.close.hours * (60 / INTERVAL_MINUTES));
      }
    });
  if (openingYo[openingYo.length - 1] < openingYo[openingYo.length - 2]) {
    openingYo = [0, openingYo[openingYo.length - 1], ...openingYo];
    openingYo.pop();
    openingYo = [...openingYo, 7 * 24 * (60 / INTERVAL_MINUTES)];
  }

  rawDeals.map((deal, i) => {
    const weekdays = deal.weekDays.split(",");
    const start = parseInt(deal.startTime.split(":")[0]);
    const end = parseInt(deal.endTime.split(":")[0]);
    dealTimes[i] = [];
    weekdays.map(weekday => {
      const offset = weekday * (60 / INTERVAL_MINUTES) * 24;
      dealTimes[i].push(offset + start * (60 / INTERVAL_MINUTES));
      dealTimes[i].push(offset + end * (60 / INTERVAL_MINUTES));
    });
  });

  return { times, openingTimes: openingYo, dealTimes };
};
