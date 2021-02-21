"use strict";
var AWS = require("aws-sdk");
const CodeBuild = require("../../aws/codeBuild");
AWS.config.apiVersions = {
  codebuild: "2016-10-06",
};
var codebuild = new AWS.CodeBuild();

module.exports.handler = async (event, context, callback) => {
  console.log("[Start autoStartCodeBuild]");
  console.log(event);

  const repositoryName = event.detail.repositoryNames[0];
  const sourceVersion = event.detail.sourceReference;
  const branchName = sourceVersion.split("/");
  const buildProjectName = repositoryName + "-" + branchName.slice(-1)[0];
  const codeBuild = new CodeBuild(codebuild);
  try {
    await codeBuild.startBuild(buildProjectName);
    return callback(null, {
      statusCode: 200,
    });
  } catch (err) {
    console.log(err);
  }
};
