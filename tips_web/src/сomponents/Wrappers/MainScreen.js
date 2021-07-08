import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { Logo } from "../../assets/icons";
import Navigation from "../Main/Navigation";
import { setChosenOrganization } from "../../redux/actions";

const MainScreen = ({ match }) => {
  const organization = useSelector((state) =>
    state.adminReducer.organizations.find((el) => el.id === +match.params.id)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (organization) dispatch(setChosenOrganization(organization.id));
  }, [organization]);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Logo />
        </div>

        <div className="header__dashboard">
          <div className="header__dashboard_item header__links">
            <Link to="/organizations" className="header__links_a">
              Все рестораны
            </Link>
            <Link className="header__links_a">+ Добавить ресторан</Link>
          </div>

          <div className="header__dashboard_item header__title">
            <Typography variant="h2" component="h2">
              {organization?.name}
            </Typography>

            <p className="header__address">{organization?.address}</p>
          </div>

          <div className="header__dashboard_item header__controllers">
            <button>c</button>
            <button>n</button>
            <button>s</button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="paper">
          <Navigation />
        </div>
      </main>
    </>
  );
};

export default MainScreen;
