import React from 'react';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

const showAuthors = _.flow(
  _.get('authors'),
  _.map('name'),
  _.join(','),
  _.truncate({ length: 40 }),
);

const Reference = ({ reference, onClick }) => (
  <div className="pure-u-1 list">
    {reference.title}
    <br/>
    <small>
      {showAuthors(reference)}
      &nbsp;
      {reference.published_year}
    </small>
    &nbsp;
    <TooltipHost
      id={`${reference.id}-tooltip`}
      content="Insert Citation & Reference"
      calloutProps={{ gapSpace: 0 }}
    >
      <Link
        aria-describedby={`${reference.id}-tooltip`}
        onClick={onClick}
      >
        <Icon iconName="InsertSignatureLine" className=""/>
      </Link>
    </TooltipHost>
  </div>
);

Reference.propTypes = {
  reference: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    published_year: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
};

export default Reference;
