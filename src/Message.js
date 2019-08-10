import React, { PureComponent } from 'react';
import { DateTime } from 'luxon';


class Message extends PureComponent {

  // shouldComponentUpdate(nextProps) {
  //   console.log(this.props.message.id, nextProps.message.id);
  //   return this.props.message.id !== nextProps.message.id;
  // }
  toTwoFigStr = (num) => {
    return num = num < 10 ? `0${num}` : `${num}`;
  }

  setTimeString = (millisecs) => {
    let { year, month, day, hour, minute, second} = DateTime.fromMillis(millisecs).c;
    const timeString = `${this.toTwoFigStr(day)}.${this.toTwoFigStr(month)}.${year} ${this.toTwoFigStr(hour)}:${this.toTwoFigStr(minute)}`;
    return timeString;
  }


  render() {
    const { message } = this.props;
    return (
  <li>
    <span className={'name'}>{`${message.from}:   `}</span>
    <span className={'time'}>{this.setTimeString(message.time)}</span>
    <p className={'message-body'}>{message.message}</p>
  </li>
    );
  }
};

export default Message;
