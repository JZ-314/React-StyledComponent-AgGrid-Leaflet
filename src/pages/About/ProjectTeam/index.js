import React from "react";

import { RootWrapper, TitleWrapper, Title, Description, Wrap } from "../styles";

export default function ProjectTeam() {
  return (
    <RootWrapper>
      <TitleWrapper>
        <Title>Project Team</Title>
        <Description>
          Coding concept, database design, grapheme drawings and coding:{" "}
          <Wrap />
          Martha J. Macri and Matthew Looper
        </Description>
        <Description>
          Major contributions, including research and coding: <Wrap />
          Ruth Krochock, Yuriy Polyukhovych, and Gabrielle Vail
        </Description>
        <Description>
          Additional contributions, including bibliographic research and image
          preparation: <Wrap />
          Judy Alexander, Heidi Altman, Monique Aw, James Brooks, Carlos
          Castillo, Michael Evans, Michael Grofe, José Gódinez Samperio, Donald
          Hales, Janis Indrikis, Justin and Barbara Kerr, Sydnee Lippman,
          Barbara MacLeod, Ben Macri, Catherine Macri, Dana Moot II, David
          Mora-Marín, Jessica Munson, Julie Ngo, Jason Richardson, Lynn
          Robinson, Sarah Robinson, Jonathan Scholnick, Sarah Shuler, Sarah
          Smallhouse, Janferie Stone, Circe Sturm, Jennifer Tancreto, Carrie
          Todd, Thomas Tolles, Todd Vasquez, William Werner, Jessica Wheeler,
          Lisa Woodward, Eostra Yarrow
        </Description>
        <Description>Website background photos by Thomas Tolles.</Description>
      </TitleWrapper>
    </RootWrapper>
  );
}
