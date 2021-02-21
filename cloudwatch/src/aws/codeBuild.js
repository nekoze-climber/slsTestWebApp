"use strict";

module.exports = class CodeBuild {
  constructor(serviceClient) {
    this.client = serviceClient;
  }
  createBuildProject(cloneUrlHttps, sourceVersion, buildProjectName) {
    var params = {
      artifacts: {
        type: "NO_ARTIFACTS",
      },
      badgeEnabled: true,
      description:
        "This build project is triggered on create or update pull request in AWS CodeCommit.",
      environment: {
        computeType: "BUILD_GENERAL1_SMALL",
        image: "aws/codebuild/amazonlinux2-x86_64-standard:3.0-20.09.14",
        type: "LINUX_CONTAINER",
      },
      name: buildProjectName,
      serviceRole: process.env.CODE_BUILD_ROLE_ARN,
      source: {
        type: "CODECOMMIT",
        location: cloneUrlHttps,
      },
      sourceVersion: sourceVersion,
    };

    return new Promise((resolve, reject) => {
      this.client.createProject(params, (err, data) => {
        if (err) {
          console.log("Create Build Project Failure!!");
          reject(err);
        } else {
          console.log("Create Build Project Success!!");
          resolve(data);
        }
      });
    });
  }

  startBuild(buildProjectName) {
    var params = {
      projectName: buildProjectName,
    };
    return new Promise((resolve, reject) => {
      this.client.startBuild(params, (err, data) => {
        if (err) {
          console.log("Start Build Failure!!");
          reject(err);
        } else {
          console.log("Start Build Success!!");
          resolve(data);
        }
      });
    });
  }

  deleteBuildProject(buildProjectName) {
    var params = {
      name: buildProjectName,
    };
    return new Promise((resolve, reject) => {
      this.client.deleteProject(params, (err, data) => {
        if (err) {
          console.log("[Failure autoDeleteCodeBuild!!]");
          reject(err);
        } else {
          console.log("[Success autoDeleteCodeBuild!!]");
          resolve(data);
        }
      });
    });
  }
};
