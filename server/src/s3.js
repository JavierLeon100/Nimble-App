import aws from "aws-sdk";
import dotenv from "dotenv";
import crypto, { randomBytes } from "crypto";
import { promisify } from "util";

const Bytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "us-east-1";
const bucketName = "nimble-s3bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    bucketName,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});

export async function generateUploadURL() {
    const rawBytes = await Bytes(16);
    const imageName = rawBytes.toString("hex");

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,
    };

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
}
