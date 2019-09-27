import React from "react";



function ProfileDetail(props) {
  return (
    <div className="text-center">
      <strong>Name: {props.name}</strong>
      <p>{props.email}</p>
    </div>
  );
}

export default ProfileDetail;
