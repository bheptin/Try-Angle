import React from 'react';

const Checkbox = props => {
  if (props.restaurant) {
    return(
        <label>
          <input type="checkbox" aria-label="..." onChange={props.handleChange.bind(this, props.restaurant.id)}/>
          {props.restaurant.name}
          <img src={props.restaurant.image_url} style={{width: "40px", height: "40px"}} alt="..." className="img-thumbnail"/>
        </label>
    )
  } else {
    return <h2>...loading</h2>
  }
}

export default Checkbox;
