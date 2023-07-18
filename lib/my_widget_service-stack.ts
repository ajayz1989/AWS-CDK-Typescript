import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as widget_service from '../lib/widget_service';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyWidgetServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new widget_service.WidgetService(this, 'Widgets');

    };
  }
