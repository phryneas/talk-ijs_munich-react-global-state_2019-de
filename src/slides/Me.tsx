import React from "react";
import { Section, Title, List, Item } from "./Components";
import { MayflowerLogo } from "./assets";

export const Me = () => (
  <Section>
    <Title>Der Typ da vorne</Title>
    <List>
      <Item>
        Lenz Weber <br />(<em>@phry</em> bei Twitter, <em>phryneas</em> überall
        anders)
      </Item>

      <Item>
        seit 2015 Developer/DevOps/Dev-
        <span aria-label="Avocado" role="img">
          🥑
        </span>{" "}
        bei
        <img
          alt="Mayflower"
          src={MayflowerLogo}
          style={{
            display: "inline",
            height: "1.4em",
            verticalAlign: "middle"
          }}
        />
      </Item>
      <Item>php: seit php4 (2003-ish)</Item>
      <Item>"ernsthaft" JavaScript: seit 2013</Item>
      <Item>React: seit 2016</Item>
      <Item>
        aktuell aktiv in OpenSource-Projekten:
        <List>
          <Item>fork-ts-checker-webpack-plugin</Item>
          <Item>redux-starter-kit</Item>
          <Item>react-async (bald: async-library)</Item>
          <Item>postgraphile</Item>
        </List>
      </Item>
    </List>
  </Section>
);
