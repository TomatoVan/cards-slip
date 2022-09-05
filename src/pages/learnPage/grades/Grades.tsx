import React, { ChangeEvent } from 'react';

import FormControl from '@mui/material/FormControl/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import FormLabel from '@mui/material/FormLabel/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import { v1 } from 'uuid';

const grades = [
  { id: v1(), value: 1, label: 'Did not know' },
  { id: v1(), value: 2, label: 'Forgot' },
  { id: v1(), value: 3, label: 'A lot of thought' },
  { id: v1(), value: 4, label: 'Confused' },
  { id: v1(), value: 5, label: 'Knew the answer' },
];

type PropsType = {
  setGrade: (grade: number) => void;
};

export const Grades = React.memo(({ setGrade }: PropsType) => {
  const onChangeRadioHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setGrade(+event.target.value);
  };

  return (
    <div className="grades">
      <FormControl>
        <FormLabel>Rate yourself:</FormLabel>
        <RadioGroup onChange={onChangeRadioHandle}>
          {grades.map(grade => (
            <FormControlLabel
              key={grade.id}
              value={grade.value}
              control={<Radio />}
              label={grade.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
});
