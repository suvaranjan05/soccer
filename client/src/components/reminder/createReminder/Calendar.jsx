import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <Box>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        showTimeSelect
        timeIntervals={15}
        timeFormat="h:mm aa"
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select date and time"
        className="custom-calendar"
      />
    </Box>
  );
};

export default Calendar;
