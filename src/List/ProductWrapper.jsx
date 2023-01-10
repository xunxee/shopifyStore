import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import PALETTE from '../styles/Palette';

const {
  basicWhite,
  basicPurple,
} = PALETTE;

const ItemLayout = styled.div({
  display: 'flex',
});

const SlideWrapper = styled.div({
  width: '65%',
});

const Slides = styled.div({
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  '& ul': {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '100%',
    backgroundColor: `${basicPurple}`,
  },
  '& img': {
    width: '600px',
    height: '600px',
  },
});

const SlideControlButton = styled.div({
  display: 'flex',
  position: 'absolute',
  right: '2.5rem',
  bottom: '2.5rem',
  width: '194px',
  border: `1px solid ${basicWhite}`,
  borderWidth: '1px',
  '& div': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '96px',
    height: '48px',
    ':first-of-type': {
      marginRight: '-1px',
    },
    ':last-child': {
      borderLeft: `1px solid ${basicWhite}`,
    },
  },
});

const SlideAlbum = styled.div({
  height: '182px',
  backgroundColor: 'red',
});

const ItemInfo = styled.div({
  width: '35%',
  height: '782px',
  backgroundColor: 'orange',
});

export default function ProductWrapper({
  product: {
    title,
    imageList,
    // TODO:
    // size,
    // details,
  },
}) {
  return (
    <>
      <ItemLayout>
        <SlideWrapper>
          <Slides>
            <SlideControlButton>
              <div>
                <FontAwesomeIcon
                  title="leftArrow"
                  icon={faArrowLeft}
                  size="2x"
                  color={basicWhite}
                />
              </div>
              <div>
                <FontAwesomeIcon
                  title="rightArrow"
                  icon={faArrowRight}
                  size="2x"
                  color={basicWhite}
                />
              </div>
            </SlideControlButton>
            {imageList && imageList.map((image) => (
              <ul key={image}>
                {title}
                <img alt={title} src={image} />
              </ul>
            ))}
          </Slides>
          <SlideAlbum />
        </SlideWrapper>
        <ItemInfo />
      </ItemLayout>
      <div>Product Info</div>
    </>
  );
}
