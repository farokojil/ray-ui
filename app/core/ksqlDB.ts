export interface QueryParams {
  ksql: string;
}

export interface MetaData {
  queryId: string;
  columnNames: string[];
  columnTypes: string[];
}

export interface InfoItem {
  symbol: string;
  country: string;
  name: string;
  business_summary: string;
  industry: string;
  sector: string;
  logo_url: string;
  website: string;
  full_time_employees: number;
  current_price: number;
  market_cap: number;
  currency: string;
}

export interface QueryResponse {
  meta: MetaData;
  items: InfoItem;
}

export const getTickerInfo = async (ticker: string) => {
  const response = await fetch("http://localhost:8088/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ksql: getTickerQuery(ticker),
      streamsProperties: {
        "ksql.streams.auto.offset.reset": "earliest",
      },
    }),
  });

  const responseText = await response.text();

  const infoItems = parseResponse(responseText);

  return infoItems;
};

function getTickerQuery(ticker: string): string {
  return `
  SELECT symbol,country,long_Name,long_business_summary,industry,sector,logo_url,website,full_time_employees,current_price,market_cap,financial_currency
  FROM info_t
  WHERE symbol='${ticker}';
  `;
}

function parseResponse(responseText: string): InfoItem[] {
  const responseArray = responseText.split("\n");
  const headerRow = responseArray.shift();
  const headerObj: MetaData = JSON.parse(headerRow as string);
  const headers = headerObj.columnNames;
  console.log(headers);

  return responseArray.map((row) => {
    if (row == "") {
      return {} as InfoItem;
    }

    const rowJSON = JSON.parse(row);
    const item: InfoItem = {
      symbol: rowJSON[0],
      country: rowJSON[1],
      name: rowJSON[2],
      business_summary: rowJSON[3],
      industry: rowJSON[4],
      sector: rowJSON[5],
      logo_url: rowJSON[6],
      website: rowJSON[7],
      full_time_employees: rowJSON[8],
      current_price: rowJSON[9],
      market_cap: rowJSON[10],
      currency: rowJSON[11],
    };

    return item;
  });
}
