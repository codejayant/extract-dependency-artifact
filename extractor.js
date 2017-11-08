function Data(packageName, dependency) {
    this.packageName = packageName;
    this.dependency = dependency;
}

const extractData = (jsonBody) => {
    console.log('json body received : ', jsonBody);
    let artifactName = jsonBody.project.artifactId;
    let dependencies;

    if (typeof(jsonBody.project.dependencyManagement) === "undefined") {
        dependencies = jsonBody.project.dependencies.dependency;
    } else {
        dependencies = jsonBody.project.dependencyManagement.dependencies.dependency;
    }

    // for each example
    // dependencies.forEach(function (element) {
    //     console.log(element.artifactId);
    // });

    let dependencyArtifactIDs = dependencies.map(ele => ele.artifactId);

    return new Data(artifactName, dependencyArtifactIDs);
};

const extractDataPromise = (jsonBody) => {
    console.debug('json body received : ', jsonBody);
    return new Promise((resolve, reject) => {
        let artifactName = jsonBody.project.artifactId;
        let dependencies;

        if (typeof(jsonBody.project.dependencyManagement) === "undefined") {
            dependencies = jsonBody.project.dependencies.dependency;
        } else {
            dependencies = jsonBody.project.dependencyManagement.dependencies.dependency;
        }

        let dependencyArtifactIDs = dependencies.map(ele => ele.artifactId);

        resolve(new Data(artifactName, dependencyArtifactIDs));
    });
};

module.exports = { extractData, extractDataPromise };