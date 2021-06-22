import React, { useState, useEffect } from "react";
import { Link, Route, useHistory, useRouteMatch } from "react-router-dom";
import CustomButton from "../c/Button";
import Staff from "../Routes/Staff";
import Visitors from "../Routes/Visitors";
import Tips from "../Routes/Tips";
import Reviews from "../Routes/Reviews";
import Events from "../Routes/Events";

const links = [
  {
    name: "Сотрудники",
    link: "staff",
    component: Staff,
  },
  {
    name: "Посетители",
    link: "visitors",
    component: Visitors,
  },
  {
    name: "Чаевые",
    link: "tips",
    component: Tips,
  },
  {
    name: "Отзывы",
    link: "reviews",
    component: Reviews,
  },
  {
    name: "События",
    link: "events",
    component: Events,
  },
];

const Navigation = () => {
  const history = useHistory();

  let index = 0;
  for (let i = 0; i < links.length; i++) {
    if (history.location.pathname.includes(links[i].link)) index = i;
  }

  const [activeLink, setActivelink] = useState(index);
  const { url } = useRouteMatch();

  const renderLinks = () => {
    return links.map((item, index) => {
      const isActive = activeLink === index;
      return (
        <Link
          to={`${url}/${item.link}`}
          className="navigation__link"
          key={index}
        >
          <CustomButton
            type={isActive ? "outline" : "fill"}
            disabled={isActive}
            handleClick={() => setActivelink(index)}
          >
            {item.name}
          </CustomButton>
        </Link>
      );
    });
  };

  const renderRoutes = () => {
    return links.map((item) => (
      <Route path={`${url}/${item.link}`} component={item.component} />
    ));
  };

  useEffect(() => {
    if (history.location.pathname === url)
      history.push(`${url}/${links[0].link}`);
  }, [history, url]);

  return (
    <>
      <nav className="navigation">{renderLinks()}</nav>
      <div className="content">{renderRoutes()}</div>
    </>
  );
};

export default Navigation;
