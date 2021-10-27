import React from "react";

import { RootWrapper, TitleWrapper, Title, Description, Wrap } from "../styles";

export default function Acknowledgments() {
  return (
    <RootWrapper>
      <TitleWrapper>
        <Title>Acknowledgements</Title>
        <Description>
          We acknowledge the contributions of the Maya people of Mexico,
          Guatemala, Belize, Honduras, and El Salvador as the authors of the
          texts included in this database and dedicate it to their descendants
          in these countries and around the world.
        </Description>
        <Description>
          We further acknowledge and are mindful that California State
          University stands on lands that were originally occupied by the first
          people of this area, and we recognize the Mechoopda and their
          distinctive spiritual relationship with this land and the waters that
          run through campus. We are humbled that the campus resides upon sacred
          lands that once sustained the Mechoopda people for centuries.
        </Description>
        <Description>
          Institutional support: <Wrap />
          Dumbarton Oaks Research Library and Collection, Washington, D.C.
          (Bridget Gazzo, Colin McEwan, Juan Antonio Murro, Joanne Pillsbury,
          Jeffrey Quilter, Loa Traxler) <Wrap />
          Boundary End Archaeology Research Center (George and Melinda Stuart){" "}
          <Wrap />
          Pre-Columbian Art Research Institute (Merle Greene Robertson) <Wrap />
          Foundation for the Advancement of Mesoamerican Studies, Inc. (FAMSI)
        </Description>
        <Description>
          Funding provided by: <Wrap />
          National Endowment for the Humanities, grants #RT21365-92, RT21608-94,
          PA22844-96 <Wrap />
          National Science Foundation, grants #SBR9710961 and IBSS1328928{" "}
          <Wrap />
          Department of Native American Studies, University of California, Davis{" "}
          <Wrap />
          Department of Linguistics, University of California, Davis <Wrap />
          Division of Humanities, Arts, and Cultural Studies, University of
          California, Davis <Wrap />
          Department of Art and Art History, California State University, Chico{" "}
          <Wrap />
          Amerind Foundation, Dragoon, Arizona
        </Description>
      </TitleWrapper>
    </RootWrapper>
  );
}
