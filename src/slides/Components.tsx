import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

export const Section = styled.section<{ type?: "title" | "content" }>(
  ({ type = "content" }) => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: type === "title" ? "center" : "flex-start", // oder space-evenly
    alignItems: "left",
    overflow: "hidden",
    fontSize: "1.5rem"
  })
);

export const Title = styled.h1({
  fontSize: "2.5rem",
  alignSelf: "center",
  textAlign: "center"
});
export const SubTitle = styled.h2({
  fontSize: "2rem",
  alignSelf: "center",
  textAlign: "center"
});

export const List = styled.ul({
  listStyleType: "disc !important",
  paddingInlineStart: "40px !important"
});
export const Item = styled.li({});

export const Image = styled(
  ({
    className,
    src,
    caption,
    style
  }: {
    className?: string;
    src: string;
    caption: string;
    style?: CSSProperties;
  }) => {
    return (
      <div className={className}>
        <img src={src} style={style} />
        {caption && <figcaption>{caption}</figcaption>}
      </div>
    );
  }
)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&>img": {
    maxHeight: "15vh"
  },
  "&>figcaption": {
    fontSize: "0.8rem"
  }
});
