import React from "react";
import CustomButton from "../../elements/Button";
import { Link } from "react-router-dom";

const OrganizationLink = (props) => {
  const { id, name, address } = props.organization;

  return (
    <li>
      <Link to={`/id=${id}`} className="organizations__link">
        <CustomButton type="fill">
          <p className="organizations__name">{name}</p>
          <p className="organizations__address">{address}</p>
        </CustomButton>
      </Link>
    </li>
  );
};

export default OrganizationLink;
