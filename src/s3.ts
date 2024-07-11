import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const getS3File = async (bucketName: string, fileName: string): Promise<Buffer> => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  const data = await s3.getObject(params).promise();
  return data.Body as Buffer;
};
