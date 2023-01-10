import styled from '@emotion/styled';

// TODO: makes slide control button
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faArrowRight,
//   faArrowLeft,
// } from '@fortawesome/free-solid-svg-icons';

const ItemLayout = styled.div({
  display: 'flex',
});

const SlideWrapper = styled.div({
  position: 'relative',
  width: '65%',
});

const Slides = styled.div({
  display: 'flex',
  overflow: 'hidden',
  '& ul': {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '100%',
    backgroundColor: 'yellow',
  },
  '& img': {
    width: '600px',
    height: '600px',
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
