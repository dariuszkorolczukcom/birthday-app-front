import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { birthdayInfo } from '../util/info'

const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
    container: {
      width: "50%",
    }
  });
  
export default function BirthTable(props) {
    const classes = useStyles();
    const [birthdays, setDecimalBirthdays] = React.useState(null);
  
    React.useEffect(() => {
      setDecimalBirthdays(props.birthdays)
    },[props.birthdays])
  
    const parseTimeSinceBirthday = (value,tableValue) => {
      return parseInt(value[0]).toLocaleString('en-US') + " " + birthdayInfo[tableValue[0]].symbol
    }
  
    const parseBirthdayDate = (value) => {
      var a = moment(value[1])
      return a.format('Do MMM YYYY')
    }
  
    return (
        <>
          {birthdays != null &&
            <TableContainer className={classes.container} component={Paper}>
            {Object.entries(birthdays).map((tableValue, tableKey) => (
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
        </>
    );
  }