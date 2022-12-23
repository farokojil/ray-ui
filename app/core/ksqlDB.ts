export interface QueryParams {
  ksql: string;
}

export interface MetaData {
  queryId: string;
  columnNames: string[];
  columnTypes: string[];
}

export interface QueryResponse {
  meta: MetaData;
}

export const getTickerInfo = async (ticker: string) => {
  const result = await fetch("http://localhost:8088/query", {
    method: "POST",
    body: JSON.stringify({
      ksql: getTickerQuery(ticker),
      streamsProperties: {
        "ksql.streams.auto.offset.reset": "earliest",
      },
    }),
  });

  return result;
};

function getTickerQuery(ticker: string): string {
  return `SELECT * FROM INFO_TEST3 WHERE SYMBOL='${ticker}';`;
}
