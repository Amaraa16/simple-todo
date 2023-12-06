import mongo from "@/pages/utils/MongoDataApiReq";

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      const { title } = req.body;

      const updated = await mongo("updateOne", {
        filter: { _id: { $oid: id } },
        update: {
          $set: {
            title: title,
          },
        },
      });

      res.status(200).json(updated);

      break;
    case "DELETE":
      const deleted = await mongo("deleteOne", {
        filter: { _id: { $oid: id } },
      });

      res.status(200).json(deleted);

      break;
  }
}
