import React from "react";
import { IjsMucSlideDeck } from "./slides/IjsMuc";
import { Slides } from "./slides/Slides";

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

export default App;
