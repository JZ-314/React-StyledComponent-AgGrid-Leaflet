import React from "react";

import { RootWrapper, TitleWrapper, Title, Description } from "../styles";

export default function HistoryProject() {
  return (
    <RootWrapper>
      <TitleWrapper>
        <Title>History of the Project</Title>
        <Description>
          Meticulously compiled over the course of more than three decades, the
          Maya Hieroglyphic Database (MHD) provides a comprehensive record of
          Maya writing and is an unparalleled dataset for conducting research
          with ancient texts and studying ancient written languages utilizing
          spatial and temporal controls. Initiated by Martha Macri of the
          University of California, Davis in the 1980s, the MHD was originally
          designed to record linguistic details in the script that could be used
          to investigate variation among speech communities during the Classic
          period. Gradually, the MHD has expanded to include all known ancient
          Maya hieroglyphic texts, including Postclassic materials, GIS
          (geographic information system) data, and additional coding of
          historical attributes, which have facilitated quantitative analyses
          and research applications Macri never envisioned. With Macri’s emerita
          status at UC Davis in 2014, the directorship of the MHD passed to
          Matthew Looper, who oversaw its transition to an online format.
        </Description>
      </TitleWrapper>
    </RootWrapper>
  );
}
