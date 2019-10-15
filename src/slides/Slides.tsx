import React from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useLocalSlice, PayloadAction } from "use-local-slice";
import { MayflowerLogo } from "./assets";

export function Slides({
  children,
  initialSlide = 1,
  initialOpen
}: React.PropsWithChildren<{ initialSlide?: number; initialOpen?: boolean }>) {
  const childArray = React.Children.toArray(children);

  const [{ slide, open }, dispatch] = useLocalSlice({
    initialState: { slide: initialSlide, open: initialOpen },
    reducers: {
      lastSlide(draft) {
        draft.slide = Math.max(0, draft.slide - 1);
      },
      nextSlide(draft) {
        draft.slide = Math.min(childArray.length - 1, draft.slide + 1);
      },
      setSlide(draft, action: PayloadAction<number>) {
        draft.slide = action.payload - 1;
      },
      toggleOpen(draft) {
        draft.open = !draft.open;
      }
    }
  });

  usePropChangesOverrideSlideNumber();
  useKeyboardNavigation();

  return (
    <SlidePortal>
      <Dialog open={!!open}>
        {childArray[slide]}
        <DialogControls>
          <NavBtn onClick={dispatch.lastSlide}>&lt;</NavBtn>
          {slide + 1} / {childArray.length}
          <NavBtn onClick={dispatch.nextSlide}>&gt;</NavBtn>
        </DialogControls>
      </Dialog>
    </SlidePortal>
  );

  function usePropChangesOverrideSlideNumber() {
    React.useEffect(() => dispatch.setSlide(initialSlide), [initialSlide]);
  }

  function useKeyboardNavigation() {
    React.useEffect(() => {
      function handler(event: KeyboardEvent) {
        switch (event.code) {
          case "ArrowLeft":
            dispatch.lastSlide();
            break;
          case "ArrowRight":
            dispatch.nextSlide();
            break;
          case "Space":
            dispatch.toggleOpen();
            break;
        }
      }
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, []);
  }
}

const Dialog = styled.dialog<{ open?: boolean }>(({ open }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid black",
  width: "80vw",
  height: "80vh",
  display: open ? "flex" : "none",
  padding: "3%",
  backgroundImage: `url('${MayflowerLogo}')`,
  backgroundPosition: "1% 99%",
  backgroundSize: "auto 7%",
  backgroundRepeat: "no-repeat"
}));

const DialogControls = styled.nav({
  position: "absolute",
  bottom: "1%",
  right: "1%",
  fontSize: "1.4rem"
});

const NavBtn = styled.button({
  border: "none",
  background: "inherit",
  "&:focus": { outline: 0 }
});

function SlidePortal({ children }: React.PropsWithChildren<{}>) {
  return ReactDOM.createPortal(
    children,
    document.getElementById("slide-root")!
  );
}
