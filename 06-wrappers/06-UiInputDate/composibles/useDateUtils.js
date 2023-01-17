import { toRefs } from 'vue';

export const useParseDate = (value, props) => {
  const { type, modelValue } = toRefs(props);
  let result;
  if (type.value === 'time') {
    let date = new Date(modelValue.value);
    let newValue = value.split(':');
    newValue[2] = newValue[2] ? newValue[2] : '00';
    date.setHours(newValue[0], newValue[1], newValue[2]);
    result = -date.getTimezoneOffset() * 60000 + Date.parse(date);
  } else if (type.value === 'datetime-local') {
    let ms = Date.parse(value);
    let dateObj = new Date(ms);
    result = -dateObj.getTimezoneOffset() * 60000 + ms;
  } else {
    result = Date.parse(value);
  }
  return {
    result,
  };
};
