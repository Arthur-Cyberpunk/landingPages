import { useEffect, useState } from "react";
import { mapData } from "../../api/map-data";
import { Base } from "../Base";
import { mockBase } from "../Base/mock";
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

  return <Base {...mockBase} />;
}

export default Home;
