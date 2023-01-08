import * as gitlabGroup from "./gitlabGroup";
import type * as pulumi from "@pulumi/pulumi";

export interface ProviderGroupData {
    args: object;
    opts: pulumi.CustomResourceOptions;
}

/**
 * [TODO:description]
 *
 * @param {string} type - [TODO:description]
 * @param {string} name - [TODO:description]
 * @param {ProviderGroupData} data - [TODO:description]
 * @throws {Error} - [TODO:description]
 * @returns {gitlabGroup.IGitlabGroup} [TODO:description]
 */
export function providerFactory (
    type: string,
    name: string,
    data: ProviderGroupData
): gitlabGroup.IGitlabGroup {
    if (type === "gitlab") {
        return new gitlabGroup.GitlabGroup(name, data.args, data.opts);
    }
    throw new Error(`Groups for provider type not supported: "${type}"`);
}
