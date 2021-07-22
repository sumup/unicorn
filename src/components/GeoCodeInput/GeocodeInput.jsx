import React, { Component } from 'react';
import { debounce } from 'lodash/fp';

import { AutoCompleteInput } from './AutoCompleteInput';
import { search } from './geocode.service';

const SEARCH_DELAY = 500;

export class GeocoderInput extends Component {
  state = {
    results: [],
  };

  updateSearchParams = (inputValue) => {
    if (inputValue === '') {
      return;
    }

    this.performSearch(inputValue);
  };

  performSearch = debounce(SEARCH_DELAY, (inputValue) => {
    search(inputValue, this.props.country)
      .then((results) => {
        this.setState({ results });
      })
      .catch(() => {
        this.setState({ results: [] });
      });
  });

  updateValue = (selection) => {
    const foundAddress = this.state.results.find(
      (obj) => obj.place_name === selection,
    );
    console.log(foundAddress);

    // this.props.onChange({
    //   center: {},

    // });
  };

  handleItemToString = (value) => {
    if (value === null) {
      return this.props.value;
    }

    const addressLines = value.split(',');
    return addressLines[0];
  };

  render() {
    const suggestions = this.state.results.map((obj) => ({
      value: obj.place_name,
      ...obj,
    }));

    return (
      <AutoCompleteInput
        onSuggestionSelect={this.updateValue}
        onInputValueChange={this.updateSearchParams}
        onItemToString={this.handleItemToString}
        options={suggestions}
        {...this.props}
      />
    );
  }
}
