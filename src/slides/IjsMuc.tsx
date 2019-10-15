import React from "react";
import {
  Section,
  Title,
  SubTitle,
  Image,
  PieChart,
  Paragraph
} from "./Components";
import { Slides } from "./Slides";
import { Me } from "./Me";
import { Wollmilchsau } from "./assets";

const stateChart = [
  { label: "authentication", value: 2 },
  { label: "configuration", value: 3 },
  { label: "api-cache", value: 30 },
  { label: "formulare", value: 20 },
  { label: "ui-state", value: 30 },
  { label: "navigation", value: 15 }
];

export function SlideDeck({
  children: _omit,
  ...props
}: React.ComponentProps<typeof Slides>) {
  return (
    <Slides {...props}>
      <Section>
        <div>
          <Title>
            Warum der Global State keine "eierlegende&nbsp;Wollmilchsau" ist
          </Title>
          <SubTitle>(und was wir wirklich nutzen sollten)</SubTitle>
        </div>
        <Image
          src={Wollmilchsau}
          caption='cc-by-sa/2.0/de wikipedia-Nutzer "Pixelrausch"'
        />
      </Section>
      <Me />
      <Section>
        <Title>Noch etwas...</Title>
        <SubTitle>Ich mag Redux wirklich!</SubTitle>
      </Section>
      <Section>
        <Title>Wir haben 100 Leute gefragt...</Title>
        <SubTitle>...woran denken Sie, wenn Sie "React State" hören?</SubTitle>
        <PieChart
          data={[
            { label: "Redux", value: 75 },
            { label: "React-Context", value: 10 },
            { label: "MobX/MobX-State-Tree", value: 7 },
            { label: "Shitstorm auf Twitter", value: 3 },
            { label: "andere", value: 5 }
          ]}
        />
      </Section>
      <Section>
        <Title>Ich finde: irgendwas läuft da schief.</Title>
        <SubTitle>Und heute schauen wir uns an, was ich damit meine.</SubTitle>
      </Section>
      <Section>
        <Title>
          So sieht in meinen Augen der State in den meisten React-Apps aus:
        </Title>
        <PieChart
          hideValue
          data={[
            { label: "global", value: 5 },
            { label: "nicht-global", value: 95 }
          ]}
        />
      </Section>
      <Section>
        <Title>
          So sieht in meinen Augen der State in den meisten React-Apps aus:
        </Title>
        <PieChart hideValue data={stateChart} />
      </Section>
    </Slides>
  );
}

/* 
Schaut man sich um, wie man State in React-Applikationen handelt, findet man vor allem drei große Namen:
* Redux
* MobX / MobX State Tree
* React Context

die ersten beiden (und mit Einschränkung auch der Dritte) werden für das handeln von globalem State genutzt.

Und das sehr häufig viel zu viel.

Schauen wir also erst mal, die Argumente "pro" globalen State an:

* Time Travel
  -> ist nicht fester Teil dieser Bibliotheken, sondern nur einfach mit ihnen. Wer nutzt das wirklich im Raum?  

* State serialisierung/deserialisierung
  -> sollte man vielleicht nicht mit dem ganzen State machen, ist aber valide

* Trennen von Business-Logik und Komponenten
  -> ja. JA! Dafür nutzt man Redux. Aber die meisten nutzen Redux & Co nur für getter/setter.

* Geschichte/Gewohnheit
  -> früher die beste, weil einzige Wahl (seit Mixins entfernt wurden)

* Architektur
  -> nicht jeder Fitzel State sollte zur Architektur beitragen.
    Wenn man den kompletten State einer Applikation von vorneherein plant gibt man sich Implementierungsdetails vor, die später an der Realität scheitern.

=> wenn man diese Sachen nutzt, kann es sinnvoll sein, auch diese Sachen im global State zu lassen. Aber in den seltensten Fällen machen diese Anwendungsfälle den ganzen global State aus.
Was also mit dem Rest?

State-Typen:

  * Navigation-State
  * Formular-State
  * Cache-State
  * UI-State
  * Session-State
  * Settings-State


*/
