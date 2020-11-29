import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import BirthTable from '../components/BirthTable'
import { postData } from '../util/http'

const api = "https://c3patn17z1.execute-api.eu-west-1.amazonaws.com/dev";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

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

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item xs={12} lg={4}>
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
              </Grid>
              <Grid item xs={12} lg={8}>
                {decimalBirthdays != null &&
                  <BirthTable birthdays={decimalBirthdays}/>
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
           