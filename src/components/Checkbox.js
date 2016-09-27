import React from 'react';

const Checkbox = props => {
  let checkValue = props.restaurant ? props.chosenRestaurants.includes(props.restaurant.id) : false;
  if (props.restaurant) {
    return(
        <label>
          <input type="checkbox" aria-label="..."
            onChange={props.handleChange.bind(this, props.restaurant.id)}
            checked={checkValue}/>
          {props.restaurant.name}
        </label>
    )
  } else {
    return <h2>...loading</h2>
  }
}

export default Checkbox;
