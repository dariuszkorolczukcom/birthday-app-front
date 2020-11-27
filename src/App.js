import React from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  container: {
    width: "50%",
  }
});

const api = "https://c3patn17z1.execute-api.eu-west-1.amazonaws.com/dev";

const birthdayInfo = {
  birthdayDate: {
    def: "your actual birthday",
  },
  hoursDecimal: {
    birthName: "Birth Hours",
    header: "Decimal Hours Birthday",
    def: "your birthday once every 100 thousand hours of your life!",
    symbol: "hours",
  },
  minutesDecimal: {
    birthName: "Birth Minutes",
    header: "Decimal Minutes Birthday",
    def: "your birthday once every million hours of your life!",
    symbol: "minutes",
  },
  secondsDecimal: {
    birthName: "Birth Seconds",
    header: "Decimal Seconds Birthday",
    def: "your birthday once every 100 million hours of your life!",
    symbol: "seconds",
  }
}

export default function MaterialUIPickers() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('1991-01-11'));
  const [decimalBirthdays, setDecimalBirthdays] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  React.useEffect(() => {
    postData(api+'/birthday', { birthday: selectedDate })
    .then(data => {
      setDecimalBirthdays(data)
  });
  },[selectedDate])

  const parseTimeSinceBirthday = (value,tableValue) => {
    return parseInt(value[0]).toLocaleString('en-US') + " " + birthdayInfo[tableValue[0]].symbol
  }

  const parseBirthdayDate = (value) => {
    var a = moment(value[1])
    return a.format('Do MMM YYYY')
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Your birthday date"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'birthday date',
          }}
        />
        {decimalBirthdays != null &&
          <TableContainer className={classes.container} component={Paper}>
          {Object.entries(decimalBirthdays).map((tableValue, tableKey) => (
            tableValue[0] === "birthdayDate" ? "" :
            <Table key={tableKey} className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{birthdayInfo[tableValue[0]].birthName}</TableCell>
                  <TableCell align="right">{birthdayInfo[tableValue[0]].header}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(tableValue[1]).map((value, key) => (
                  <TableRow key={key}>
                    <TableCell align="left">{parseTimeSinceBirthday(value,tableValue)}</TableCell>
                    <TableCell align="right">{parseBirthdayDate(value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>))}
          </TableContainer>
        }
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}               