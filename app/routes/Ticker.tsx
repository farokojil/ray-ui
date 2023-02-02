import { Avatar, Container, Grid, Link, Typography } from "@mui/material";
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
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Typography paragraph> {String(info?.country)}</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography paragraph>{String(info?.sector)}</Typography>
        </Grid>
        <Grid xs={3}>
          <Typography paragraph>{String(info?.industry)}</Typography>
        </Grid>
        <Grid xs={1}>
          <Avatar
            src={String(info?.logo_url)}
            style={{
              backgroundColor: logo_bg,
            }}
          />
        </Grid>

        <Grid xs={6}>
          <Typography variant="h1" gutterBottom>
            <Link href={String(info?.website)}>{String(info?.name)}</Link>
          </Typography>
        </Grid>

        <Grid xs={3}>
          <Typography paragraph>({String(info?.symbol)})</Typography>
        </Grid>
        <Grid xs={2}></Grid>
        <Grid xs={4}>
          <Typography paragraph>
            {String(info?.current_price)} {String(info?.currency)}
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Typography paragraph>
            <span>Market Cap: </span>
            {String(info?.market_cap)}
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Typography paragraph>
            <span> # of Employees:</span>
            {String(info?.full_time_employees)}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography paragraph>{String(info?.business_summary)}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
