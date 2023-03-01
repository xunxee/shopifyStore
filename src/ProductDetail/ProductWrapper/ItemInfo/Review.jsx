import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& div': {
    paddingRight: '.25rem',
    fontSize: '.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500,
  },
});

const StyledReviewWrapper = styled.div({
  padding: '1.5rem 0',
});

export default function Review(
  { evaluation: { starRating, review } },
) {
  function makeStar(score) {
    const scoreList = score.split('.');

    const result = [];

    for (let i = 1; i <= Number(scoreList[0]); i += 1) {
      result.push((
        <span key={i}>
          <FontAwesomeIcon
            title="star"
            icon={faStar}
            size="xl"
            color="#000"
          />
        </span>
      ));

      if (i === Number(scoreList[0]) && scoreList.length === 2) {
        result.push(
          <span key={i + 1}>
            <FontAwesomeIcon
              title="star"
              icon={faStarHalf}
              size="xl"
              color="#000"
            />
          </span>,
        );
      }
    }

    return result;
  }

  return (
    <Wrapper>
      <StyledReviewWrapper>
        {makeStar(starRating)}
      </StyledReviewWrapper>
      <div>{`${review.length} reviews`}</div>
    </Wrapper>
  );
}
