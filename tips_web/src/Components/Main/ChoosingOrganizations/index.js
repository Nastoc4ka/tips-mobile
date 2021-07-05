import React, { useLayoutEffect } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationsSaga } from "../../../redux/actions";
import OrganizationLink from "./OrganizationLink";
import DoubleScreen from "../../Wrappers/DoubleScreen";

const OrganizationsList = () => {
  const dispatch = useDispatch();
  const { organizations } = useSelector((state) => state.adminReducer);
  const { user } = useSelector((state) => state.authLoginReducer);

  const renderOrganizationsLinks = () => {
    return organizations.map((organization) => (
      <OrganizationLink organization={organization} key={organization?.id} />
    ));
  };

  useLayoutEffect(() => {
    if (!organizations.length) dispatch(getOrganizationsSaga(user.id));
  }, [organizations, dispatch, user]);

  return (
    <DoubleScreen>
      <Typography variant="h1" component="h2" gutterBottom>
        Заведения
      </Typography>
      <ul className="block__content">{renderOrganizationsLinks()}</ul>
    </DoubleScreen>
  );
};

export default OrganizationsList;
