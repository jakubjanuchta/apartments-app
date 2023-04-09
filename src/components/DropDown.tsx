import { DropDownOption, DropDownSelectProps } from "@/types/types";
import React, { useRef } from "react";
import ReactSelect, { components, ValueContainerProps } from "react-select";
import styles from "@/styles/DropDown.module.scss";
import { isDesktop } from "react-device-detect";

const ValueContainer = ({
  children,
  ...props
}: ValueContainerProps<DropDownOption>) => {
  let [values, input] = children as any;

  if (Array.isArray(values)) {
    const val = (i: number) => values[i].props.children;
    const { length } = values;
    const { id: selectId } = props.selectProps;

    if (length < 2) {
      values = `${val(0)}`;
    } else {
      const plural =
        selectId === "types-select"
          ? "rodzaje"
          : selectId === "districts-select" && length > 4
          ? "dzielnic"
          : "dzielnice";

      values = `Wybrano ${length} ${plural}`;
    }
  }

  return (
    <components.ValueContainer {...props}>
      {values}
      {input}
    </components.ValueContainer>
  );
};

const Option = (props: any) => {
  return (
    <div className={styles.inputWithCheckbox}>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export const DropDownSelect = ({
  value,
  selectAllLabel,
  options,
  onChange,
  selectId,
}: DropDownSelectProps) => {
  const valueRef = useRef(value);
  valueRef.current = value;

  const selectAllOption = {
    value: 99,
    label: selectAllLabel,
    className: "select_all_jazda",
    class: "select_all_jazda",
    style: { color: "red" },
    key: "siema",
  };

  const isSelectAllSelected = () =>
    valueRef.current && valueRef.current.length === options.length;

  const isOptionSelected = (option: DropDownOption) =>
    (valueRef.current &&
      valueRef.current.some(
        ({ value }: { value: number }) => value === option.value
      )) ||
    isSelectAllSelected() ||
    false;

  const getOptions = () => [selectAllOption, ...options];

  const getValue = () => (isSelectAllSelected() ? [selectAllOption] : value);

  const onValChange = (newValue: any, actionMeta: any) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      onChange(options, actionMeta);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      onChange([], actionMeta);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      onChange(
        options.filter(({ value }: any) => value !== option.value),
        actionMeta
      );
    } else {
      onChange(newValue || [], actionMeta);
    }
  };

  return (
    <ReactSelect
      id={selectId}
      instanceId={selectId}
      isOptionSelected={isOptionSelected}
      options={getOptions()}
      value={getValue()}
      onChange={onValChange}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      placeholder={"Wybierz"}
      isSearchable={isDesktop}
      noOptionsMessage={({ inputValue }) =>
        !inputValue ? "Brak opcji" : "Nie znaleziono"
      }
      isMulti
      components={{
        ValueContainer,
        Option,
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          padding: "3px 8px",
          fontFamily: "inherit",
          fontWeight: 300,
          borderColor: "grey",
        }),
        menuList: (provided, el) => ({
          ...provided,
          fontFamily: "inherit",
          fontWeight: 300,
          color: "grey",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderColor: "grey",
          borderWidth: 2,
        }),

        option: (styles, { isFocused, isSelected }) => ({
          ...styles,
          background: isFocused || isSelected ? "rgba(204,204,204)" : undefined,
          zIndex: 1,
        }),
      }}
    />
  );
};
