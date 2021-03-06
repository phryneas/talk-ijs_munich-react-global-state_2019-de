import React from "react";
import {
  Section,
  Title,
  SubTitle,
  Image,
  PieChart,
  Comment,
  Paragraph
} from "./Components";
import { SlideDeck } from "./Slides";
import { Me } from "./Me";
import { Wollmilchsau, MayflowerLogo } from "./assets";

function c(args: TemplateStringsArray) {
  return <Comment />;
}

enum StateLabels {
  appConfig = "App-Config",
  authentication = "Authentication",
  options = "Optionen",
  apiCache = "API Cache",
  forms = "Formulare",
  uiState = "UI-State",
  navigation = "Navigation"
}

const stateChart = [
  { label: StateLabels.appConfig, value: 2 },
  { label: StateLabels.authentication, value: 3 },
  { label: StateLabels.options, value: 3 },
  { label: StateLabels.apiCache, value: 30 },
  { label: StateLabels.forms, value: 20 },
  { label: StateLabels.uiState, value: 27 },
  { label: StateLabels.navigation, value: 15 }
];

export function IjsMucSlideDeck() {
  return (
    <SlideDeck>
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
            { label: "global", value: 6 },
            { label: "gar kein State", value: 2 },
            { label: "nicht-global", value: 92 }
          ]}
        />
      </Section>
      <Section>
        <Title>
          So sieht in meinen Augen der State in den meisten React-Apps aus:
        </Title>
        <PieChart hideValue data={stateChart} />
      </Section>
      <Section>
        <Title>
          Aber es gibt doch <em>gute Gründe</em>, das alles in den globalen
          State zu packen!
        </Title>
      </Section>
      <Section>
        <Title>#guteGründe</Title>
        <Title>Alles von überall erreichbar</Title>
        {c`
          * nicht nur Segen, sondern auch Fluch:
            * Verantwortlichkeiten werden aufgegeben, sowohl im Code als auch in der Kommunikation unter Entwicklern.
            * überall anders versuchen wir ja auch, Globalen zu vermeiden, bezeichnen Singletons als Antipattern.
          `}
      </Section>
      <Section>
        <Title>#guteGründe</Title>
        <Title>Trennen von Business-Logik und (dummen) Komponenten</Title>
        {c`
          * ja. JA! Dafür nutzt man Redux. Aber die meisten nutzen Redux & Co nur für getter/setter.
          `}
      </Section>
      <Section>
        <Title>#guteGründe</Title>
        <Title>Architektur</Title>
        {c`
          * nicht jeder Fitzel State sollte zur Architektur beitragen.
          Wenn man den kompletten State einer Applikation von vorneherein plant gibt man sich Implementierungsdetails vor, 
          die später an der Realität scheitern.      
          `}
      </Section>
      <Section>
        <Title>#guteGründe</Title>
        <Title>Time Travel</Title>
        {c`
          * nur möglich, wenn man alles in den global State packt, worüber getravelled werden sollt 
          * macht kaum jemand 
          * können Redux/MST auch gar nicht von Haus aus (haben aber die Veranlagung dazu)
          `}
      </Section>
      <Section>
        <Title>#guteGründe</Title>
        <Title>State (de)-serialisieren und irgendwohin wegsichern</Title>
        {c`
          * sollte man vielleicht nicht mit dem ganzen State machen, ist aber valide
          * wer macht das alles?
          `}
      </Section>
      <Section>
        <Title>#guteGründe</Title>
        <Title>Gewohnheit</Title>
        {c`
          * früher die beste, weil einzige Wahl (seit Mixins entfernt wurden), um Asynchronitäten gut zu managen
          `}
      </Section>
      <Section>
        <Title>
          Na gut, nehmen wir einfach mal an, wir wollen wirklich nicht alles im
          Global State halten...
        </Title>
        <SubTitle>Live-Coding-Time!</SubTitle>
      </Section>
      <StateHeader label={StateLabels.appConfig} />
      <StateHeader label={StateLabels.apiCache} />
      <StateHeader label={StateLabels.uiState} />
      <StateHeader label={StateLabels.forms} text="Formularen" />
      <StateHeader label={StateLabels.navigation} />

      <StateHeader label={StateLabels.authentication} />
      <StateHeader label={StateLabels.options} />
      <Section>
        <Title>Fast vergessen</Title>
        Derived State gehört meistens in Komponenten, nicht in den State!
      </Section>
      <Section>
        <Title>Schön und gut...</Title>
      </Section>
      <Section>
        <Title>
          Das ist jetzt ja schon alles sehr auf Hooks ausgelegt, oder?
        </Title>
      </Section>
      <Section>
        <Title>Und...Tests?!?</Title>
        <SubTitle>Vorher konnte man doch so schön die Reducer testen!</SubTitle>
        <Paragraph>
          (...das Zusammenspiel mit 20 Middlewares besser mal nicht...)
        </Paragraph>
      </Section>
      <Section>
        <Title>Nochmal zurück:</Title>
        <SubTitle>#GuteGründe</SubTitle>
        <Paragraph>Gibt es wirklich.</Paragraph>
        <Paragraph>Nur nicht immer.</Paragraph>
        <SubTitle>
          Ich kann hier nur anregen, ich will euch nichts vorschreiben!
        </SubTitle>
      </Section>
      <Section>
        <Title>Das wars.</Title>
      </Section>
      <Section>
        <Title>Fragen und Antworten</Title>
        <SubTitle>Grillt mich ;)</SubTitle>
      </Section>
      <Section>
        <SubTitle>Achja:</SubTitle>
        <Title>Wir heuern an!</Title>
        <img alt="Mayflower" src={MayflowerLogo} style={{ height: "15%" }} />
      </Section>
    </SlideDeck>
  );
}

function StateHeader({
  label,
  text = label
}: {
  label: StateLabels;
  text?: string;
}) {
  return (
    <Section>
      <Title>Was mache ich dann mit...?</Title>
      <SubTitle>{text}</SubTitle>
      <PieChart hideValue data={stateChart} highlighted={[label]} />
    </Section>
  );
}
