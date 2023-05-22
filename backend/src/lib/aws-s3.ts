import { S3Client } from '@aws-sdk/client-s3'

const s3Config = {
  endpoint: process.env.AWS_S3_BUCKET,
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
}
export const s3Client = new S3Client(s3Config)
