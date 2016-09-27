import React from 'react';
import Select from './Select';
import Checkbox from './Checkbox';
import _ from 'lodash';
import AngleMade from './AngleMade.js';

const Choose = props => {
  let {allRestaurants, userPrefs, chosenRestaurants, handleCheck, friendsChoices, handleChange} = props;
  let myCheckboxes = userPrefs.map((restaurant, index) => <Checkbox key={index} restaurant={allRestaurants[restaurant]} chosenRestaurants={chosenRestaurants} handleChange={handleChange}/>);
  let theirCheckboxes = _.valuesIn(friendsChoices).map((friendChoices, index) => (
    <div className="their-choices" key={index}>
      <h2>Friend Choices</h2>
      {friendChoices.map((restaurant, index) => <Checkbox key={index} restaurant={allRestaurants[restaurant]} chosenRestaurants={chosenRestaurants} handleChange={handleChange}/>)}
    </div>
  ));
  return (
    <div style={{border: "3px solid green"}}>
      <div className="my-choices">
        <h2>My Choices</h2>
        {myCheckboxes}
        <Select myChoices={userPrefs} chosenRestaurants={chosenRestaurants} handleSelect={handleCheck}/>
      </div>
      {theirCheckboxes}
      <AngleMade finalDecision={props.chosenRestaurants}/>
    </div>
  )
}

export default Choose;
