import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import SwipeableViews from 'react-swipeable-views';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { birthdayInfo } from '../util/info'

const useStyles = makeStyles(() => ({
  // root: {
  //   backgroundColor: theme.palette.background.paper,
  //   width: 500,
  // },
  table: {
    minWidth: 300,
  },
  container: {
    width: "50%",
  },
  bar: {
    boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.4)",
  }
}));

function TabContainer({ children }) {
  return (
    <Box p={1}>
        {children}
    </Box>
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
      <Paper elevation={3}>
          <AppBar className={classes.bar} position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant={null}>
              {Object.entries(birthdays).map((tableValue, tableKey) => 
                  <Tab key={tableKey} label={birthdayInfo[tableValue[0]].birthName} />
              )}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={'x'}
            index={value}
            onChangeIndex={handleChangeIndex}>
            {Object.entries(birthdays).map((tableValue, tableKey) => 
                <TabContainer key={tableKey}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>{birthdayInfo[tableValue[0]].header1}</TableCell>
                        <TableCell align="right">{birthdayInfo[tableValue[0]].header2}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(tableValue[1]).map((rowValue, rowKey) =>
                          <TableRow key={rowKey}>
                            <TableCell align="left">{parseTimeSinceBirthday(rowValue,tableValue)}</TableCell>
                            <TableCell align="right">{parseBirthdayDate(rowValue)}</TableCell>
                          </TableRow>
                      )}
                    </TableBody>
                </Table>
              </TabContainer>)}
          </SwipeableViews>
          </Paper>}
    </>
  );
}