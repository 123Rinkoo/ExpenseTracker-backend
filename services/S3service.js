const AWS = require('aws-sdk');

const uploadToS3=(data, filename)=>{
    const BUCKET_NAME = 'expensetreeker';
    const IAM_USER_KEY = 'AKIA4UJBZYKSG65KVBMD';
    const IAM_USER_SECRET = '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';

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        bucket: BUCKET_NAME
    })
    // s3bucket.createBucket(()=>{           //ye banane ki jarurat nahi hai kyunki hum already bna chuke hain bucket.
    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'   //ye likhne se apne aap url jo aayega vo publicly available hoga
    }
    return new Promise((resolve, reject) => {

        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('something went wrong', err)
                reject(err);
            } else {
                console.log('success', s3response);
                resolve(s3response.Location);
            }
        })
    })
}

module.exports={
    uploadToS3
}