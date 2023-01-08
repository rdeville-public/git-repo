import type * as gitlab from "@pulumi/gitlab";
import * as gitlabProvider from "./gitlab";
import type * as pulumi from "@pulumi/pulumi";

export interface ProviderData {
    args: gitlab.ProviderArgs;
    opts: pulumi.CustomResourceOptions;
}

/**
 * [TODO:description]
 *
 * @param {string} type - [TODO:description]
 * @param {string} name - [TODO:description]
 * @param {ProviderData} data - [TODO:description]
 * @throws {Error} - [TODO:description]
 * @returns {provider.IProvider} [TODO:description]
 */
export function providerFactory (
    type: string,
    name: string,
    data: ProviderData
): gitlabProvider.GitlabProvider {
    if (type === "gitlab") {
        return new gitlabProvider.GitlabProvider(name, data.args, data.opts);
    }
    throw new Error(`Git provider type not supported: "${type}"`);
}
