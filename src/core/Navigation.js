// export a navigation component (use react-router-dom)
import React from "react";
import { colors } from "../theme/colors";
import { rem } from "polished";
import { NavLink } from "react-router-dom";
import AccountPage from "../pages/AccountPage";
import HomePage from "../pages/HomePage";
import { Route, Switch } from "react-router-dom";

import styled from "styled-components";
import { Heading } from "../styled/Heading";

const NavBar = styled.div`
  display: flex;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  padding: ${rem(12)};
  box-sizing: border-box;
  color: ${colors.primary};
  font-size: ${rem(12)};

  &.active {
    background-color: ${colors.primary};
    color: ${colors.base};
  }

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.base};
  }
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

function Navigation() {
  return (
      <div>
    <NavBar>
        <NavItem to="/" exact activeClassName="active">
            Home
        </NavItem>
        <NavItem to="/Request" exact activeClassName="active">
            Request
        </NavItem>
    </NavBar>
          <Container>
              <Content>
                  <Switch>
                      <Route path="/" exact component={HomePage} />
                      <Route path="/Request" component={AccountPage} />
                      <Route render={() => <Heading>404 Page not found</Heading>} />
                  </Switch>
              </Content>
          </Container>
      </div>
  );
}

export default Navigation;