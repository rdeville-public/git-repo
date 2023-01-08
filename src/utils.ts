import * as process from "process";
import * as pulumi from "@pulumi/pulumi";
import {spawnSync} from "child_process";

/**
 * [TODO:description]
 *
 * @param {string} fullCmd - [TODO:description]
 * @throws {Error} - [TODO:description]
 * @returns {string} [TODO:description]
 */
function getCmdValue (fullCmd: string): string {
    const zero = 0;
    const one = 1;
    const cmd = fullCmd.split(" ")[zero];
    const args = fullCmd.split(" ").slice(one);
    const exec = spawnSync(cmd, args, {"encoding": "utf8"});

    if (exec.status !== zero) {
        // eslint-disable-next-line max-len
        throw new Error(`Command ${fullCmd} exited with following error: \n${exec.stderr}`);
    }
    return exec.stdout.replace("\n", "");
}

/**
 * [TODO:description]
 *
 * @param {string} envVarName - [TODO:description]
 * @throws {Error} - [TODO:description]
 * @returns {string} [TODO:description]
 */
function getEnvValue (envVarName: string): string {
    const env = process.env[envVarName];
    if (env === "" || typeof env === "undefined") {
        throw new Error(`Environment variable '${envVarName}' does not exists`);
    } else {
        return env;
    }
}

/**
 * [TODO:description]
 *
 * @param {string} parent - [TODO:description]
 * @param {object} data - [TODO:description]
 * @throws {Error} - [TODO:description]
 * @throws {Error} - [TODO:description]
 * @returns {string} [TODO:description]
 */
export function getValue (
    parent: string,
    data: string | {[key: string]: string}
): pulumi.Output<string> | string {
    if (typeof data === "string") {
        return data;
    } else if (data.cmd) {
        return pulumi.secret(getCmdValue(data.cmd));
    } else if (data.env) {
        return pulumi.secret(getEnvValue(data.env));
    }

    // eslint-disable-next-line max-len
    throw new Error(`Pulumi config key '${parent}' should have a subkey valid among (cmd | env)`);
}
