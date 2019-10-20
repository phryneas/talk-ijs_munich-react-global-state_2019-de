import React from "react";
import { IjsMucSlideDeck } from "./slides/IjsMuc";
import { Slides } from "./slides/Slides";
import { hot } from "react-hot-loader/root";
import { App } from "./App";

function Main({ store, history }) {
  return (
    <div>
      <Wrapper>
        <App store={store} history={history} />
      </Wrapper>
      <Slides initialOpen>
        <IjsMucSlideDeck />
      </Slides>
    </div>
  );
}

/**
 * react-hot-loader will offer the possibility to "reload" if
 * something with hot-swapping hooks went wrong - at the next higher class component.
 * This can be used to just provide that border, so that an reload does not impact slides.
 */
class Wrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

export default process.env.NODE_ENV === "development" ? hot(Main) : Main;
