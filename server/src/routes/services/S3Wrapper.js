import AWS from "aws-sdk"

class S3Wrapper {
  static config = () => {
    this.bucketName = process.env.AWS_BUCKET
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID
      })
    });
  }

  static upload = async(file, fileName) => {
    try{
      if( this.bucketName == undefined || this.bucketName == null ){
        this.config()
      }
      const upload = await new AWS.S3.ManagedUpload({
        params:{
          Bucket: this.bucketName,
          Key: encodeURIComponent(fileName),
          Body: file.buffer
        }
      })
      upload.send()
      return upload.promise()
    }
    catch(err){
      console.log(err)
      return err
    }
  }
}

export default S3Wrapper