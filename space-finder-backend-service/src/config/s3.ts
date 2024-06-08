import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  apiVersion: '2006-03-01',
});

export const listAllBuckets = async () => {
  const command = new ListBucketsCommand({});
  const result = (await s3Client.send(command)).Buckets;

  return result;
};
