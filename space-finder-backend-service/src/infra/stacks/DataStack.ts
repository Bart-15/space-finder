import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  HttpMethods,
  IBucket,
} from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

import { getSuffixFromStack } from '../Utils';

export class DataStack extends Stack {
  public readonly spacesTable: ITable;
  public readonly deploymentBucket: IBucket;
  public readonly photosBucket: IBucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    // ----------------------------------------------------
    // -                  S3 Bucket                     -
    // ----------------------------------------------------
    this.deploymentBucket = new Bucket(this, 'SpaceFinderClient', {
      bucketName: `space-finder-client-${suffix}`,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    this.photosBucket = new Bucket(this, 'SpaceFinderPhotos', {
      bucketName: `space-finder-photos-${suffix}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      cors: [
        {
          allowedMethods: [HttpMethods.HEAD, HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
    });

    new CfnOutput(this, 'SpaceFinderPhotosBucketName', {
      value: this.photosBucket.bucketName,
    });

    // ----------------------------------------------------
    // -                  Dynamo Db Table                 -
    // ----------------------------------------------------
    this.spacesTable = new Table(this, 'SpacesTable', {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      tableName: `SpaceTable-${suffix}`,
    });
  }
}
