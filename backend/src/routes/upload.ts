import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { extname } from 'node:path'
import { s3Client } from '../lib/aws-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!upload) {
      return reply.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

    if (!isValidFileFormat) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const fileToUpload = await upload.toBuffer()
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fileToUpload,
      ACL: 'public-read',
    })

    try {
      await s3Client.send(command)
    } catch (error) {
      reply.code(500).send({ error: 'Falha ao realizar o upload do arquivo' })
    }

    return { fileName }
  })
}
