import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import SwipeableViews from 'react-swipeable-views';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { birthdayInfo } from '../util/info'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
    container: {
      width: "50%",
    }
  });

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
  
export default function BirthTable(props) {
    const classes = useStyles();
    const [birthdays, setBirthdays] = React.useState(null);
    const [value, setValue] = React.useState(0);
  
    React.useEffect(() => {
      setBirthdays(props.birthdays)
    },[props.birthdays])
  
    const parseTimeSinceBirthday = (value,tableValue) => {
      return parseInt(value[0]).toLocaleString('en-US') + " " + birthdayInfo[tableValue[0]].symbol
    }
  
    const parseBirthdayDate = (value) => {
      var a = moment(value[1])
      return a.format('Do MMM YYYY')
    }


    function handleChange(event, newValue) {
      setValue(newValue);
    }
  
    function handleChangeIndex(index) {
      setValue(index);
    }
  
    return (
        <>  
        {birthdays != null && 
          <>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant={null}
                >
                {Object.entries(birthdays).map((tableValue, tableKey) => 
                    <Tab label={birthdayInfo[tableValue[0]].birthName} />
                )}
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
              >
              {Object.entries(birthdays).map((tableValue, tableKey) => 
                  <TabContainer>
                    <Table key={tableKey} className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{birthdayInfo[tableValue[0]].header1}</TableCell>
                          <TableCell align="right">{birthdayInfo[tableValue[0]].header2}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(tableValue[1]).map((value, key) =>
                            <TableRow key={key}>
                              <TableCell align="left">{parseTimeSinceBirthday(value,tableValue)}</TableCell>
                              <TableCell align="right">{parseBirthdayDate(value)}</TableCell>
                            </TableRow>
                        )}
                      </TableBody>
                  </Table>
                </TabContainer>)}
            </SwipeableViews>
          </>}
        </>
    );
  }