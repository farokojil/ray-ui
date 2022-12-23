import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTickerInfo } from "../core/ksqlDB.js";
import { usePageEffect } from "../core/page.js";

export default function Ticker(): JSX.Element {
  let { ticker } = useParams<"ticker">();
  ticker += ".DE"; // TODO: fix 404 errors when . is added to URL

  const [info, setInfo] = useState<string | null>(null);

  usePageEffect({ title: "Ticker Page " + ticker });
  useEffect(() => {
    const fetchData = async () => {
      const infoResponse = await getTickerInfo(String(ticker));
      const info = await infoResponse.text();
      setInfo(info);
      console.log(info);
    };

    fetchData().catch(console.error);
  }, [ticker]);

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(3) }}
    >
      <Typography variant="h1" gutterBottom>
        Ticker Page {ticker}
      </Typography>
      <Typography paragraph>INFO: {String(info)}</Typography>
    </Container>
  );
}
