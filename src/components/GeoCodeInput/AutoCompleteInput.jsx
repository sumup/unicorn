import React, { Component } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Downshift from "downshift";
import { isString, isEmpty } from "lodash/fp";
import { SearchInput, Card, Text } from "@sumup/circuit-ui";

const autoCompleteWrapperStyles = ({ theme }) => css`
  margin-bottom: ${theme.spacings.mega};
  label: input__container;
  position: relative;
  min-width: 150px;
  label > &,
  label + & {
    margin-top: ${theme.spacings.bit};
  }
`;

const AutoCompleteWrapper = styled("div")(autoCompleteWrapperStyles);

const optionsStyles = ({ theme }) => css`
  label: input__options;
  position: absolute;
  top: calc(100% + ${theme.spacings.bit});
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.popover};
  padding: ${theme.spacings.bit} 0;
`;

const Options = styled(Card)(optionsStyles);

Options.defaultProps = Card.defaultProps;

const optionBaseStyles = ({ theme }) => css`
  label: input__option;
  cursor: pointer;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: ${theme.spacings.byte} ${theme.spacings.mega};
`;

const optionSelectedStyles = ({ selected, theme }) =>
  selected &&
  css`
    label: input__option--selected;
    color: ${theme.colors.p500};
    background-color: ${theme.colors.n100};
  `;

const Option = styled(Text)(optionBaseStyles, optionSelectedStyles);

export class AutoCompleteInput extends Component {
  handleDownShiftRef = (ref) => {
    this.downshiftRef = ref;
  };

  handleOuterClick = (state) => {
    state.setState({ inputValue: this.props.value });
  };

  formatSearchInputValue = (v) => {
    if (v && v != null && typeof v === "object") {
      return v?.place_name;
    }

    return v || "";
  };

  render() {
    const {
      options,
      onInputValueChange,
      onSuggestionSelect,
      onItemToString,
      ...inputProps
    } = this.props;

    return (
      <Downshift
        ref={this.handleDownShiftRef}
        onSelect={onSuggestionSelect}
        onInputValueChange={onInputValueChange}
        onOuterClick={this.handleOuterClick}
        itemToString={onItemToString}
      >
        {({
          getRootProps,
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
        }) => (
          <AutoCompleteWrapper {...getRootProps({ refKey: "ref" })}>
            <SearchInput
              {...getInputProps({
                ...inputProps,
                value: this.formatSearchInputValue(this.props.value),
              })}
              noMargin
            />
            {isOpen && !isEmpty(options) && (
              <Options spacing={"mega"}>
                {options.map((option, index) => {
                  const item = isString(option) ? { value: option } : option;
                  const { value, children = value, ...rest } = item;

                  return (
                    <Option
                      {...getItemProps({ item: value })}
                      key={value}
                      selected={index === highlightedIndex}
                      noMargin
                      {...rest}
                    >
                      {children}
                    </Option>
                  );
                })}
              </Options>
            )}
          </AutoCompleteWrapper>
        )}
      </Downshift>
    );
  }
}
