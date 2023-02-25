import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useCallback, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import PALETTE from '../../../styles/palette';

import { selectColor, selectSize } from '../../slice';

const { basicWhite, paleGray, dark } = PALETTE;

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0',
});

const StyledButton = styled.button((
  { name, title, selectedOption },
) => ({
  width: '48px',
  height: '48px',
  marginRight: '1rem',
  border: selectedOption === title
    ? '2px solid #000'
    : '2px solid #999',
  borderRadius: '50%',
  fontSize: '.875rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.025em',
  backgroundColor: name === 'color' ? title : basicWhite,
  cursor: 'pointer',
  transitionProperty: 'backgroundColor, transform',
  transitionDuration: '0.4s, 0.4s',
  transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
  '&:hover': {
    border: selectedOption === title
      ? '2px solid #000'
      : '1px solid #000',
    backgroundColor: name === 'color' ? title : paleGray,
    transform: 'scale(1.2)',
  },
  '&:focus': {
    border: '2px solid #000',
  },
  '&:nth-of-type(1)': {
    borderColor: selectedOption === title
      ? '#000'
      : '#999',
    '&:hover': {
      borderColor: dark,
    },
  },
}));

export default function DetailOptionButton({
  name,
  options,
  selectedOption,
  onClickOption,
}) {
  const dispatch = useDispatch();

  const handleClick = useCallback((option) => {
    onClickOption(option);
  }, [onClickOption]);

  useEffect(() => {
    if (name === 'size') {
      dispatch(selectSize(options[0]));

      return;
    }

    dispatch(selectColor(options[0]));
  }, []);

  return (
    <Wrapper>
      {options.map((option) => (
        <StyledButton
          type="button"
          key={option}
          name={name}
          title={option}
          selectedOption={selectedOption}
          onClick={() => handleClick(option)}
        >
          {name === 'color' && selectedOption === option
            ? (
              <FontAwesomeIcon
                title="check"
                icon={faCheck}
                size="1x"
              />
            )
            : null}
          {
            name === 'color'
              ? null
              : option
          }
        </StyledButton>
      ))}
    </Wrapper>
  );
}
