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
  eventTime: string;
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
  return `SELECT * FROM INFO_TEST3 WHERE SYMBOL='${ticker}';`;
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
    const item: InfoItem = { symbol: rowJSON[0], eventTime: rowJSON[1] };
    return item;
  });
}
