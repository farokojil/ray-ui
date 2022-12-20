/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePageEffect } from "../core/page.js";

/**
 * Generated by https://getterms.io
 */
export default function Ticker(): JSX.Element {
  const { ticker } = useParams<"ticker">();
  usePageEffect({ title: "Ticker Page " + ticker });

  return (
    <Container
      maxWidth="sm"
      sx={{ marginTop: (x) => x.spacing(3), marginBottom: (x) => x.spacing(3) }}
    >
      <Typography variant="h1" gutterBottom>
        Ticker Page {ticker}
      </Typography>
    </Container>
  );
}
