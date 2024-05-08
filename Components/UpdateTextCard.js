import React from 'react';
import { Text } from 'react-native';

const UpdateTextCard = (props) => {
    function convertDateFormat(inputDate) {
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return `${formattedDate}, ${formattedTime}`;
    }
  return (
    <Text style={{ color: 'red', fontWeight: '800', fontSize: 15, position: 'absolute', right: 10, bottom: 4, zIndex:1 }}>
      Deadline: <Text style={{color: "red", fontWeight: "600"}}>{convertDateFormat(props.message)}</Text>
    </Text>
  );
};

export default UpdateTextCard;
