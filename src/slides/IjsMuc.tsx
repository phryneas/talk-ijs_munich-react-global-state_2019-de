import React from "react";
import { Section, Title, SubTitle, Image } from "./Components";
import { Slides } from "./Slides";
import { Me } from "./Me";
import { Wollmilchsau } from "./assets";

export function SlideDeck({
  children: _omit,
  ...props
}: React.ComponentProps<typeof Slides>) {
  return (
    <Slides {...props}>
      <Section type="title">
        <Title>
          Warum der Global State keine "eierlegende&nbsp;Wollmilchsau" ist
        </Title>
        <SubTitle>(und was wir wirklich nutzen sollten)</SubTitle>
        <Image
          src={Wollmilchsau}
          caption='cc-by-sa/2.0/de wikipedia-Nutzer "Pixelrausch"'
        />
      </Section>
      <Me />
      <Section>asd</Section>
    </Slides>
  );
}
