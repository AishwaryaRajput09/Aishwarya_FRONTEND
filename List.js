import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
// memoizing the component to prevent unnecessary re-renders
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
  // using a callback function to handle the click event to avoid creating a new function on every render
  const handleClick = useCallback(() => {
    onClickHandler(index);
  }, [onClickHandler, index]);

  return (
    <li
      // dynamically setting background color based on whether or not the item is selected
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={handleClick} // using the callback function for click event
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
// memoizing the component to prevent unnecessary re-renders
const List = memo(({ items }) => {
  // using the state hook to store the index of the selected item
  const [selectedIndex, setSelectedIndex] = useState(null);

  // using the useEffect hook to reset the selected index when the items prop changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  // using a callback function to handle the click event for each item to avoid creating a new function on every render
  const handleClick = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index} // adding a key prop to prevent console warnings and improve performance
          onClickHandler={handleClick} // passing the callback function to the child component
          text={item.text}
          index={index}
          isSelected={selectedIndex === index} // checking if the current index is the same as the selected index
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

List.defaultProps = {
  items: null,
};

export default List;
