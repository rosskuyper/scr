import {format} from 'date-fns'
import cryptoRandomString from 'crypto-random-string'
import AWS from 'aws-sdk'
import {
    S3_BUCKET,
    CDN_URL_BASE,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION,
} from '../config'

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_DEFAULT_REGION,
})

const rawFileKey = (): string => {
    const datePrefix = format(new Date(), 'yyyy/mm/dd')
    const slug = cryptoRandomString({length: 5, type: 'url-safe'})

    return `${datePrefix}/${slug}`
}

export const saveImage = async (image: Buffer): Promise<string> => {
    const baseKey = rawFileKey()
    const key = `${baseKey}.png`

    const s3 = new AWS.S3()

    const params = {
        Bucket: S3_BUCKET,
        Key: key,
        Body: image,
        ContentType: 'image/png',
    }

    await s3.upload(params).promise()

    return `${CDN_URL_BASE}/${key}`
}
