import { aws_apigateway, aws_lambda, aws_s3, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";


export class WidgetService extends Construct{
    constructor(scope: Construct, id: string){
        super(scope, id);

        //create a s3 bucket
        const bucket = new aws_s3.Bucket(scope, 'WidgetStore');

        //create lambda function
        const handler = new aws_lambda.Function(scope, "WidgetHandler", {
            runtime: aws_lambda.Runtime.NODEJS_16_X,
            code: aws_lambda.Code.fromAsset('resources'),
            handler: 'widgets.main',
            environment: {
                BUCKET: bucket.bucketName
            }
        });  
        //grant access to lambda to interact with bucket
        bucket.grantReadWrite(handler);

        //create Api gateway, which will act as a trigger for lambda
        const api = new aws_apigateway.RestApi(scope, 'widgets-api',{
            restApiName: 'Widget Service',
            description: 'This service serves widgets.'
        })

        const widgetIntegration = new aws_apigateway.LambdaIntegration(handler);

        api.root.addMethod('GET', widgetIntegration);
        api.root.addMethod("POST", widgetIntegration); 
        api.root.addMethod("DELETE", widgetIntegration);
    }
}