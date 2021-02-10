import React from 'react';
import parse from 'html-react-parser';

const Preview = (html) => {
  return (
    <div id="preview">
      {parse(`${html}`)}
    </div>
  )
}

export default Preview;