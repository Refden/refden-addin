import React, { Component } from 'react';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Separator } from 'office-ui-fabric-react/lib/Separator';

const showAuthors = _.flow(
  _.get('authors'),
  _.map('name'),
  _.join(','),
  _.truncate({ length: 40 }),
);

class Reference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
    }
  }

  renderPageInput = () => {
    return (
      <div>
        <Separator />
        <div style={{ padding: '0 15px 15px' }}>
          <TextField label="Page:"
                     value={this.state.page}
                     onChange={(_event, page) => this.setState({ page })} />
        </div>
      </div>
    );
  };

  handleOnClick = (options = {}) => () => {
    options.page = this.state.page;

    this.props.onClick(options);
  };

  hasPage = () => this.state.page !== '';

  render = () => (
    <div className="pure-u-1 list">
      {this.props.reference.title}
      <br/>
      <small>
        {showAuthors(this.props.reference)}
        &nbsp;
        {this.props.reference.published_year}
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
              onClick: this.handleOnClick(),
            },
            {
              key: 'without_author',
              iconProps: {
                iconName: 'InsertSignatureLine',
              },
              text: 'Suppress Author',
              secondaryText: '(2000)',
              onClick: this.handleOnClick({ suppressAuthor: true }),
            },
            {
              key: 'only_author',
              iconProps: {
                iconName: 'InsertSignatureLine',
              },
              text: 'Only Author',
              secondaryText: '(Author)',
              disabled: this.hasPage(),
              onClick: this.handleOnClick({ onlyAuthor: true }),
            },
            {
              key: 'only_page',
              iconProps: {
                iconName: 'InsertSignatureLine',
              },
              text: 'Only Page',
              secondaryText: '(10)',
              disabled: !this.hasPage(),
              onClick: this.handleOnClick({ onlyPage: true, page: this.state.page }),
            },
            {
              key: 'page',
              onRender: this.renderPageInput,
            },
          ],
        }}
      />
    </div>
  )
}

Reference.propTypes = {
  reference: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    published_year: PropTypes.number,
  }),
  onClick: PropTypes.func.isRequired,
};

export default Reference;
