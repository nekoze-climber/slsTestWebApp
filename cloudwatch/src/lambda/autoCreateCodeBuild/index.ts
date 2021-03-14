import * as AWS from 'aws-sdk';
import { Handler } from 'aws-lambda';
import Codebuild from '../../aws/codeBuild';

AWS.config.apiVersions = {
    codebuild: '2016-10-06',
};
const codebuild = new AWS.CodeBuild();

export const handler: Handler = async (event, context, callback) => {
    console.log('[Start autoCreateCodeBuild]');
    console.log(event);

    const repositoryName = event.detail.repositoryNames[0];
    const region = process.env.REGION;
    const cloneUrlHttps = `https://git-codecommit.${region}.amazonaws.com/v1/repos/${repositoryName}`;
    const sourceVersion = event.detail.sourceReference;
    const branchName = sourceVersion.split('/');
    const buildProjectName = `${repositoryName}-${branchName.slice(-1)[0]}`;
    const codeBuild = new Codebuild(codebuild);
    try {
        await codeBuild.createBuildProject(cloneUrlHttps, sourceVersion, buildProjectName);
        await codeBuild.startBuild(buildProjectName);
        return callback(null, {
            statusCode: 200,
        });
    } catch (err) {
        return callback(err);
    }
};
