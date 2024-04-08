import express, { Express, Request, Response } from "express";
import dynamoose, { Schema } from "dynamoose";
import { PORT, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "./config";

// Define user schema
const userSchema = new dynamoose.Schema({
  _id: { type: String },
  phoneNumber: { type: String, required: true },
  phoneCode: { type: String, required: true },
}, { timestamps: true });

// Create Dynamoose model
const User = dynamoose.model("User", userSchema);

const accountSchema = new dynamoose.Schema({
  _id: { type: String },
  name: { type: String },
  email: { type: String, required: true },
  userId: { type: dynamoose.type.ANY, schema: 'User' },
}, { timestamps: true });

// Create Dynamoose model
const Account = dynamoose.model("Account", accountSchema);

const startServer = async (): Promise<void> => {
  const app: Express = express();
  console.log(`Worker ${process.pid} started`);

  // Connect to DynamoDB
  try {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: `${AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${AWS_SECRET_ACCESS_KEY}`,
  },
  region: `${AWS_REGION}`,
});

    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb);
    console.log("DynamoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to DynamoDB:", error);
    process.exit(1);
  }

  app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ message: `Heavenly Feast Matrimonial Responsing........` });
  });

  const server = app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}/`);
  });

  // Prompt user for phone code during registration (example)
  const data = {
    _id: '1',
    phoneNumber: '2123456789',
    phoneCode: '+91',
  };

  // try {
  //   await User.create(data);
  //   console.log("User created successfully");
  // } catch (error) {
  //   console.error("Error creating user:", error);
  // }

  // let userScan;

  // try {
  //   userScan = await User.scan().exec();
  //   console.log(userScan);
  // } catch (error) {
  //   console.error("Error scanning users:", error);
  // }

  // try {
  //   const data = {
  //     _id: '1',
  //     name: 'Mayank',
  //     email: 'matank@gmail.com',
  //     userId: '1'
  //   };
  //   await Account.create(data);
  //   console.log("User created successfully");
  // } catch (error) {
  //   console.error("Error creating user:", error);
  // }

  try {
    let accountScan = await Account.scan().exec();
    let populatedAccounts = await Account.batchGet(accountScan.map(account => account.userId));
    console.log(populatedAccounts);
  } catch (error) {
    console.error("Error scanning users:", error);
  }

  // Handle server errors
  server.on("error", (err) => {
    console.error("Server error:", err);
    process.exit(1);
  });
};

startServer();


// const ddb = new dynamoose.aws.ddb.DynamoDB({
//   credentials: {
//     accessKeyId: `${AWS_ACCESS_KEY_ID}`,
//     secretAccessKey: `${AWS_SECRET_ACCESS_KEY}`,
//   },
//   region: `${AWS_REGION}`,
// });