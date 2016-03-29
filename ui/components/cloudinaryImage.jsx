import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class CloudinaryImage extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { publicId, ...props } = this.props;
    const src = `http://res.cloudinary.com/dwk2g0keh/t_media_lib_thumb/${publicId}`;
    return (<img src={src} {...props}/>);
  }
}

CloudinaryImage.propTypes = {
  publicId: React.PropTypes.string.isRequired,
};

export default CloudinaryImage;

