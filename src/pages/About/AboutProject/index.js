import React from "react";

import {
  RootWrapper,
  TitleWrapper,
  Title,
  Description,
  SubTitleWrapper,
  SubTitle,
  Link,
} from "../styles";

export default function AboutProject() {
  return (
    <RootWrapper>
      <TitleWrapper>
        <Title>About the Project</Title>
        <Description>
          The Maya Hieroglyphic Database encodes all known examples of the
          script from the Preclassic through the Postclassic periods utilizing
          three-digit alphanumeric codes to indicate distinct characters
          or graphemes. A fourth letter is added to some graphemes to designate
          different functions. The texts are accessed via the TEXTS database,
          with each record corresponding to a glyph block or a roughly square
          graphic component used to compose Maya texts. The TEXTS database
          provides contextual information for the blocks, including region,
          site, monument, location, Mayan and English glosses, semantic data,
          and chronological information. The CATALOG database lists each
          distinctive grapheme in the script, and gives logographic or syllabic
          values where possible, Mayan and English glosses, semantic categories,
          and bibliographic references. For more complete descriptions of the
          fields <Link href="/about">click here</Link>. For more detailed
          information about how to use the database{" "}
          <Link href="/about">click here</Link>.
        </Description>
      </TitleWrapper>
      <SubTitleWrapper>
        <SubTitle>Questions or Comments</SubTitle>
        <Description>
          Please address all questions and comments regarding the content,
          appearance, and functioning of this website as well as questions about
          contributing data and images to{" "}
          <Link href="/about">Matthew Looper</Link>.
        </Description>
      </SubTitleWrapper>
      <SubTitleWrapper>
        <SubTitle>Citation</SubTitle>
        <Description>
          To cite this database, please use the following: Looper, Matthew G.
          and Martha J. Macri 1991-[current year] Maya Hieroglyphic Database.
          Department of Art and Art History, California State University, Chico.{" "}
          <Link href="/about">www.mayadatabase.org</Link>
        </Description>
      </SubTitleWrapper>
    </RootWrapper>
  );
}
