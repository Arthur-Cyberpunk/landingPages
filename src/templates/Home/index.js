import { useEffect, useState } from "react";
import { mapData } from "../../api/map-data";
import { GridContent } from "../../components/GridContent";
import { GridImage } from "../../components/GridImage";
import { GridText } from "../../components/GridText";
import { GridTwoColum } from "../../components/GridTwoColumn";
import { Base } from "../Base";
import { Loading } from "../Loading";
import { PageNotFound } from "../PageNotFound";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetch(
          "http://localhost:1337/api/pages/?filters[slug]=landing-page&populate=deep",
        );
        const json = await data.json();
        const { attributes } = json.data[0];
        const pageData = mapData([attributes]);
        setData(() => pageData[0]);
      } catch {
        setData(undefined);
      }
    };

    load();
  }, []);

  if (data === undefined) {
    return <PageNotFound />;
  }

  if (data && !data.slug) {
    return <Loading />;
  }

  const { menu, sections, footerHtml, slug } = data;
  const { links, text, link, srcImg } = menu;

  return (
    <Base
      links={links}
      footerHtml={footerHtml}
      logoData={{ text, link, srcImg }}
    >
      {sections.map((section, index) => {
        const { component } = section;
        const key = `${slug}-${index}`;

        if (component === "section.section-two-columns") {
          return <GridTwoColum key={key} {...section} />;
        }

        if (component === "section.section-content") {
          return <GridContent key={key} {...section} />;
        }

        if (component === "section.section-grid-text") {
          return <GridText key={key} {...section} />;
        }

        if (component === "section.section-grid-image") {
          return <GridImage key={key} {...section} />;
        }
      })}
    </Base>
  );
}

export default Home;
