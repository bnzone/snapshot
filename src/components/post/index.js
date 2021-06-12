import { useRef } from 'react';
import PropTypes from 'prop-types';
import usePhotos from '../../hooks/usePhotos';
import Header from './header';
import Image from './image';

export default function Post({ content }) {
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    likes: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};
