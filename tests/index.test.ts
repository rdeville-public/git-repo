import * as path from "path";
import * as pulumi from "@pulumi/pulumi";
import * as automation from "@pulumi/pulumi/automation";
import * as yaml from "yamljs";
import test from "ava";


function stringifyConfig(data: any): string {
    let returnData = "";
    for (const key in data) {
        if (typeof key === "object") {
            stringifyConfig(data[key]);
        } else {
            returnData = JSON.stringify(data[key])
        }
    }
    return returnData
}

function setPulumiConfig (): string {
    /* eslint-disable */
    const pulumiConfig = yaml.load(
        path.join(__dirname, "..", "Pulumi.example.yaml")
    );
    /* eslint-enable */
    const str = stringifyConfig(pulumiConfig)
    return str
}

const ENV: {[key: string]: string} = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "PULUMI_CONFIG": setPulumiConfig()
};

Object.entries(ENV).forEach(([key, val]) => {
    process.env[key] = val;
});

// eslint-disable-next-line
import * as index from "../src/index";

test("Deploy from index", async (currTest) => {
    const projectName = "git-repo";
    const projectSettings: automation.ProjectSettings = {
        "name": "git-repo",
        "runtime": "nodejs"
    };
    const ws = await automation.LocalWorkspace.create({projectSettings});
    const stackName = "test";
    const stack = await automation.Stack.createOrSelect(stackName, ws);
    await stack.up();
    // const deploy = index.deploy();
     // currTest.snapshot(deploy);
    // const value = true;
    // currTest.is(value, true)
    await ws.removeStack(stackName);
});

