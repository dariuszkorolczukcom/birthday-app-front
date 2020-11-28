import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import BirthTable from '../components/BirthTable'
import { postData } from '../util/http'

const api = "https://c3patn17z1.execute-api.eu-west-1.amazonaws.com/dev";

export default function MaterialUIPickers() {
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
            <BirthTable birthdays={decimalBirthdays}/>
        }
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
           