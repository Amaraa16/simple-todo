import mongo from "@/pages/utils/MongoDataApiReq";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const Get = await mongo("find", {});
      res.status(200).json(Get);

      break;
    case "POST":
      const { title } = req.body;

      const Created = await mongo("insertOne", {
        document: {
          title: title,
        },
      });
      res.status(200).json(Created);
  }
}
