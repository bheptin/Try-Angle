import React from 'react';

const Friends = ({ uid, users, visibleFriends, checkedFriends, nameInSearch, searchTerm, userCanProceed, handleCheck, handleChange, handleClick }) => {
  let filteredFriendsList = users.filter( user => checkedFriends.includes(user.key)
    || visibleFriends.includes(user.key) || nameInSearch(user.personalInfo.firstName, user.personalInfo.lastName) )
    .filter(user => user.key !== uid)
    .map((user, index) => (
      <li key={index}>
        <h4>{user.personalInfo.firstName} {user.personalInfo.lastName}</h4>
        <input onChange={handleCheck.bind(this, user.key)} type="checkbox" checked={checkedFriends.includes(user.key)}/>
      </li>));
  return(
    <div className="Friends container-fluid">
      <h3>Who would you like to enjoy a meal with?</h3>
      <div className="row">
        <ul className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" style={{listStyleType: "none"}}>
          <input className="friends-search" type="text" placeholder="search for someone!" value={searchTerm} onChange={handleChange}/>
          {filteredFriendsList}
        </ul>
        <img className="img-circle hidden-xs col-sm-2 col-md-2 col-lg-4 col-xl-4 col-sm-offset-1 col-md-offset-2 col-lg-offset-2 col-xl-offset-2"
          src="http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/new_years_healthy_eating_slideshow/getty_rm_photo_of_friends_eating_appetizers.jpg"
          alt="pasta fork plate"/>
      </div>
      <div className="row">
        <button onClick={handleClick} type="button"
          className={`btn btn-primary btn-sm col-xs-10 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xs-offset-1 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 col-xl-offset-2 ${userCanProceed ? "active" : "disabled"}`}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Friends;
