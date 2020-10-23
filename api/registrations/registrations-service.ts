import { getDbClient } from "../utils/database";

export async function getAllReg() {
  const dbClient = await getDbClient();
  const applications = await dbClient
    .db()
    .collection("applications")
    .find()
    .toArray();
  return applications;
}

export async function getAllRegRoundWise(round: number) {
  const dbClient = await getDbClient();
  const applications = await dbClient
    .db()
    .collection("applications")
    .find({ Round: round })
    .toArray();
  return applications;
}

export async function addNewApp(app) {
  const dbClient = await getDbClient();
  let newapp = app;
  let r = await dbClient.db().collection("round").findOne({});
  newapp.Round = r.round;
  await dbClient.db().collection("applications").insertOne(app);
}

export async function updateRound(round: any) {
  const dbClient = await getDbClient();
  await dbClient.db().collection("round").deleteOne({});
  await dbClient.db().collection("round").insertOne({ round: round });
}