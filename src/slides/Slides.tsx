import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useLocalSlice, PayloadAction } from "use-local-slice";
import { MayflowerLogo } from "./assets";

const SlideCtx = React.createContext({
  slide: 0,
  setSlideCount: (count: number): void => void 0
});

export function SlideDeck({ children }: React.PropsWithChildren<{}>) {
  const { slide, setSlideCount } = useContext(SlideCtx);
  const childArray = React.Children.toArray(children);
  useEffect(() => setSlideCount(childArray.length), [
    setSlideCount,
    childArray.length
  ]);
  return <>{childArray[slide]}</>;
}

export function Slides({
  children,
  initialOpen = false
}: React.PropsWithChildren<{ initialSlide?: number; initialOpen?: boolean }>) {
  const [{ slide, open, totalCount }, dispatch] = useSlideState({
    initialOpen
  });
  useKeyboardNavigation(dispatch);

  return (
    <SlidePortal>
      <Dialog open={!!open}>
        <SlideCtx.Provider
          value={{ slide, setSlideCount: dispatch.setSlideCount }}
        >
          {children}
        </SlideCtx.Provider>
        <DialogControls>
          <NavBtn onClick={dispatch.lastSlide}>&lt;</NavBtn>
          {slide + 1} / {totalCount}
          <NavBtn onClick={dispatch.nextSlide}>&gt;</NavBtn>
        </DialogControls>
      </Dialog>
    </SlidePortal>
  );
}

const STATEKEY = "__openSlide";

function useSlideState({ initialOpen }: { initialOpen: boolean }) {
  return useLocalSlice({
    initialState: {
      slide: Number.parseInt(window.localStorage.getItem(STATEKEY) || "0"),
      open: initialOpen,
      totalCount: 0
    },
    reducers: {
      lastSlide(draft) {
        draft.slide = Math.max(0, draft.slide - 1);
        window.localStorage.setItem(STATEKEY, String(draft.slide));
      },
      nextSlide(draft) {
        draft.slide = Math.min(draft.totalCount - 1, draft.slide + 1);
        window.localStorage.setItem(STATEKEY, String(draft.slide));
      },
      setSlide(draft, action: PayloadAction<number>) {
        draft.slide = action.payload - 1;
        window.localStorage.setItem(STATEKEY, String(draft.slide));
      },
      toggleOpen(draft) {
        draft.open = !draft.open;
      },
      setSlideCount(draft, action: PayloadAction<number>) {
        draft.totalCount = action.payload;
      }
    }
  });
}

function useKeyboardNavigation(dispatch: ReturnType<typeof useSlideState>[1]) {
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
  }, [dispatch]);
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
