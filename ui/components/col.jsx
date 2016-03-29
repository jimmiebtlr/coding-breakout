import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';


class Col extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const { children, xs, sm, md, lg } = this.props;

    const classes = [];

    if (xs) { classes.push(`col-xs-${xs}`); }
    if (sm) { classes.push(`col-sm-${sm}`); }
    if (md) { classes.push(`col-md-${md}`); }
    if (lg) { classes.push(`col-lg-${lg}`); }


    return (<div className={classes.join(' ')}>
      {children}
    </div>);
  }
}

Col.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array.isRequired,
    React.PropTypes.object.isRequired,
  ]),
  xs: React.PropTypes.number,
  sm: React.PropTypes.number,
  md: React.PropTypes.number,
  lg: React.PropTypes.number,
};

export default Col;
