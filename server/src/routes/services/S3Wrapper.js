import AWS from "aws-sdk"

class S3Wrapper {
  static config = () => {
    this.s3 = new AWS.S3()
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
          Key: fileName,
          Body: file.buffer
        }
      }, (err, data) => {
        if(err){
          console.log(err)
        }
        else{
          console.log(data)
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

  static delete = async(fileName) => {
    try{
      if( !this.bucketName || this.bucketName.length < 1 ){
        this.config()
      }
      const params = {
        Bucket: this.bucketName,
        Key: fileName
      }
      const response = this.s3.deleteObject(params, (err, data) => {
        if(err){
          console.log(err)
        }
        else{
          console.log(data)
        }
      })
      return response
    }
    catch(error){
      console.log(error)
      return err
    }
  }
}

export default S3Wrapper