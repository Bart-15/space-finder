import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { generateTemporaryCredentials } from '@/helpers/generateCredentials';

// eslint-disable-next-line import/extensions
import Output from '../../../space-finder-backend-service/outputs.json';

const awsRegion = 'ap-southeast-1';

export function useS3ImageUpload() {
  async function uploadFile(token: string, files: File[]) {
    const file = files[0];
    const credentials = await generateTemporaryCredentials(token);

    const s3Client = new S3Client({
      credentials: credentials,
      region: awsRegion,
    });

    const command = new PutObjectCommand({
      Bucket: Output.DataStack.SpaceFinderPhotosBucketName,
      Key: file.name,
      ACL: 'public-read',
      Body: file,
    });
    await s3Client.send(command);
    // return `https://${command.input.Bucket}.s3.${awsRegion}.amazonaws.com/${command.input.Key}`;
  }

  return {
    uploadFile,
  };
}
