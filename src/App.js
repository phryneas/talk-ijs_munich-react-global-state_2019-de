import React from "react";
import { IjsMucSlideDeck } from "./slides/IjsMuc";
import { Slides } from "./slides/Slides";
import { hot } from "react-hot-loader/root";

function App() {
  return (
    <div>
      qwe
      <Slides initialSlide={1} initialOpen>
        <IjsMucSlideDeck />
      </Slides>
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;
