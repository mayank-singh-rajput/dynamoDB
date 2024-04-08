import express, { Express, Request, Response } from "express";
import dynamoose from "dynamoose";
import { PORT, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "./config";
import { v4 as uuidv4 } from 'uuid';

// Define user schema
const userSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, default: () => uuidv4(), },
  phoneNumber: { type: String, required: true },
  phoneCode: { type: String, required: true },
}, { timestamps: true });

// Create Dynamoose model
const User = dynamoose.model("User", userSchema);

const accountSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, default: () => uuidv4(), },
  name: { type: String },
  email: { type: String, required: true },
  userId: { type: User },
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

  // try {
  //   const data = {
  //     phoneNumber: '2123456789',
  //     phoneCode: '+91',
  //   };
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
  //     name: 'Mayank',
  //     email: 'mayank@gmail.com',
  //     userId: 'f7d59b2f-95a5-45c8-bf4c-4e76b638584f'
  //   };
  //   await Account.create(data);
  //   console.log("Account created successfully");
  // } catch (error) {
  //   console.error("Error creating user:", error);
  // }

  try {
    let account = await (await Account.scan('id').contains('7eba1d4e-181f-4d50-aebb-a8ed4ed6e050').exec()).populate();
    // let account = await (await Account.scan().exec()).populate();
    console.log(account);
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






// try {
//   let accountScan = await Account.get('c22aed5d-ab7e-4d83-a357-749b2ab30e9d').then(function(acc) {
//       return acc.populate({
//         path: 'userId',
//         model: 'User',
//         populate: {
//           path: 'userId',
//           model: 'User'
//         }
//       })
//   })
//   .then(function(items) {
//     console.log(items); // Logging populated accounts inside the then block
//   });

//   console.log(accountScan); // Logging outside the try block
// } catch (error) {
//   console.error("Error scanning users:", error);
// } 