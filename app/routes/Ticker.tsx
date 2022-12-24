import { Container, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTickerInfo, InfoItem } from "../core/ksqlDB.js";
import { usePageEffect } from "../core/page.js";
import { useTheme } from "../core/theme.js";

export default function Ticker(): JSX.Element {
  let { ticker } = useParams<"ticker">();
  ticker += ".DE"; // TODO: fix 404 errors when . is added to URL

  const [info, setInfo] = useState<InfoItem | null>(null);

  usePageEffect({ title: "Ticker Page " + ticker });
  useEffect(() => {
    const fetchData = async () => {
      const infoItems: InfoItem[] = (await getTickerInfo(
        String(ticker)
      )) as InfoItem[];
      setInfo(infoItems[0]);
      console.log(infoItems[0]);
    };

    fetchData().catch(console.error);
  }, [ticker]);

  const theme = useTheme();
  const logo_bg = theme?.palette?.mode === "dark" ? "white" : "";

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(3) }}
    >
      <img
        src={String(info?.logo_url)}
        style={{
          backgroundColor: logo_bg,
        }}
      />
      <Typography variant="h1" gutterBottom>
        {String(info?.country)}{" "}
        <Link href={String(info?.website)}>{String(info?.name)}</Link> (
        {String(info?.symbol)})
      </Typography>
      <Typography paragraph>
        {String(info?.sector)} == {String(info?.industry)}
      </Typography>
      <Typography paragraph>
        {String(info?.current_price)} {String(info?.currency)}
      </Typography>
      <Typography paragraph>
        <span>Market Cap: </span>
        {String(info?.market_cap)}
        {"\n"}
        <span># of Employees:</span> {String(info?.full_time_employees)}
      </Typography>
      <Typography paragraph>{String(info?.business_summary)}</Typography>
    </Container>
  );
}
