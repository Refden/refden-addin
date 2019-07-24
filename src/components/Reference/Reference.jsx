import React from 'react';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

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
    <DefaultButton
      className="my-1"
      style={{ width: '100%' }}
      text="Insert Citation & Reference"
      menuProps={{
        shouldFocusOnMount: true,
        items: [
          {
            key: 'default',
            iconProps: {
              iconName: 'InsertSignatureLine',
            },
            text: 'Default',
            secondaryText: '(Author, 2000)',
            onClick: onClick,
          },
          {
            key: 'without_author',
            iconProps: {
              iconName: 'InsertSignatureLine',
            },
            text: 'Suppress Author',
            secondaryText: '(2000)',
            onClick: () => onClick({ suppressAuthor: true }),
          },
          {
            key: 'only_author',
            iconProps: {
              iconName: 'InsertSignatureLine',
            },
            text: 'Only Author',
            secondaryText: '(Author)',
            onClick: () => onClick({ onlyAuthor: true }),
          },
        ],
      }}
    />
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
