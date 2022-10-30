import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SIZES, COLORS, FONTS, icons, images} from '../constants';

const CustomDropdown = ({
  open,
  setOpen,
  setValue,
  value,
  items,
  setItems,
  placeholder,
  categorySelectable,
  listParentLabelStyle,
  multiple,
  zIndex,
  zIndexInverse,
  onChangeValue,
  maxHeight,
  onOpen,
  closeAfterSelecting,
  onSelectItem,
  containerStyle,
  dropdownContainerStyle,
}) => {
  return (
    <DropDownPicker
      style={{
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.true_gray_300,
        minHeight: 45,
        paddingHorizontal: 20,
      }}
      maxHeight={maxHeight}
      dropDownContainerStyle={{
        backgroundColor: COLORS.lightGray1,
        borderWidth: null,
        paddingHorizontal: 20,
      }}
      placeholder={placeholder}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onOpen={onOpen}
      zIndex={zIndex}
      onChangeValue={onChangeValue}
    />
  );
};

export default CustomDropdown;
