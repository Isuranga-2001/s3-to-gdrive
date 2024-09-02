import { S3Client, GetObjectCommand, ListObjectsV2Command, S3ClientConfig } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import { Readable } from 'stream';

config();

const s3Config: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION,
};

const s3 = new S3Client(s3Config);

export const getS3File = async (fileName: string): Promise<Buffer> => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  });

  const { Body } = await s3.send(command);

  if (Body instanceof Readable) {
    const chunks: Uint8Array[] = [];
    for await (const chunk of Body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  throw new Error('Unexpected body type');
};

export const listS3Files = async (): Promise<any[]> => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: "TestCompany01/", // Specifies the folder name
  });

  const data = await s3.send(command);
  return data.Contents || [];
};
