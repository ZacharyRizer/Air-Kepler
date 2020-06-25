import React, { useContext } from 'react';
import { ResponsiveContext } from 'grommet';

const FourOhFour = () => {
  const size = useContext(ResponsiveContext);
  return <>{size !== 'small' ? <div className="four_oh_four"></div> : null}</>;
};

export default FourOhFour;
