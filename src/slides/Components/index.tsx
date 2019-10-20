import styled from "@emotion/styled";
import React, { CSSProperties } from "react";

export { PieChart } from "./PieChart";

export const Section = styled.section<{ type?: "spread" | "content" }>(
  ({ type = "spread" }) => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: type === "spread" ? "space-evenly" : "flex-start",
    alignItems: type === "spread" ? "center" : "left",
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
export const Paragraph = styled.p({});

export const List = styled.ul({
  listStyleType: "disc !important",
  paddingInlineStart: "40px !important"
});
export const Item = styled.li({});

export const Comment: React.FC = () => <></>;

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
      <figure className={className}>
        <img src={src} alt={caption} style={style} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
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
