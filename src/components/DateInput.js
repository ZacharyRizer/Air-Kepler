import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../Context';
import { Box, Calendar, Drop, Keyboard, TextInput } from 'grommet';

// Yes, these are for the odd but conventional U.S. way of representing dates.
const MONTHS = ['[2-9]', '0[1-9]', '1[0-2]'];
const DAYS = ['[4-9]', '0[1-9]', '[1-2][0-9]', '3[0-1]'];
const MONTH_REGEXP = new RegExp(MONTHS.map((m) => `^${m}$`).join('|'));
const MONTH_DAY_REGEXP = new RegExp(
  DAYS.map((d) => MONTHS.map((m) => `^${m}/${d}$`).join('|')).join('|')
);
const MONTH_DAY_YEAR_REGEXP = new RegExp('^(\\d{1,2})/(\\d{1,2})/(\\d{4})$');

const DateInput = ({ id }) => {
  const { date, setDate } = useContext(Context);
  const [text, setText] = useState('');
  const [active, setActive] = useState('');
  const [focusInput, setFocusInput] = useState(false);
  const dropTarget = useRef();

  useEffect(() => {
    if (focusInput) {
      const element = document.getElementById(id);
      element.focus();
    }
  }, [focusInput, id]);

  const onFocus = () => {
    if (!focusInput) {
      setActive(true);
    } else {
      setFocusInput(false);
    }
  };

  const onInput = (event) => {
    let {
      target: { value },
    } = event;
    let newDate = date;
    const match = value.match(MONTH_DAY_YEAR_REGEXP);
    if (match) {
      newDate = new Date(
        match[3],
        parseInt(match[1], 10) - 1,
        match[2]
      ).toISOString();
    } else if (value.length > text.length) {
      // never add characters if the user is backspacing
      // add trailing '/' when it looks appropriate
      if (value.match(MONTH_REGEXP)) {
        value = `${value}/`;
      } else if (value.match(MONTH_DAY_REGEXP)) {
        value = `${value}/`;
      }
    }
    setText(value);
    setDate(newDate.toISOString());
    setActive(true);
  };

  const onSelect = (isoDate) => {
    const newDate = new Date(isoDate);
    const newText = `${
      newDate.getMonth() + 1
    }/${newDate.getDate()}/${newDate.getFullYear()}`;

    setText(newText);
    setDate(newDate.toISOString());
    setActive(false);
    setFocusInput(true);
  };

  return (
    <Box>
      <Keyboard onDown={() => setActive(true)}>
        <TextInput
          ref={dropTarget}
          id={id}
          placeholder="MM/DD/YYYY"
          value={text}
          onInput={onInput}
          onFocus={onFocus}
        />
      </Keyboard>
      {active ? (
        <Drop
          target={dropTarget.current}
          align={{ top: 'bottom', left: 'left' }}
          onClose={() => setActive(false)}>
          <Box pad="small">
            <Calendar size="small" date={date} onSelect={onSelect} />
          </Box>
        </Drop>
      ) : null}
    </Box>
  );
};

export default DateInput;
