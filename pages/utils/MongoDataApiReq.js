export default async function mondoDataApiReq(action, options) {
  const result = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/data-rdjgv/endpoint/data/v1/action/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "ZscqJw5tQGjlWX43fU7Vblq7QDazZllS294T3XjWn2UmJaM1Q70Ds0d2gAKFtJUh",
    },
    body: JSON.stringify({
      dataSource: "cluster0",
      database: "Todo",
      collection: "Todo",
      ...options,
    }),
  }).then((res) => res.json());

  return result;
}
