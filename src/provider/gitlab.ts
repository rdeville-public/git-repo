import * as gitlab from "@pulumi/gitlab";
import type * as pulumi from "@pulumi/pulumi";

export interface IGitlabProvider {
    name: string;
    provider: gitlab.Provider;
}

/**
 * [TODO:description]
 *
 * @implements {IGitlabProvider} IGitlabProvider
 */
export class GitlabProvider implements IGitlabProvider {

    public name = "";

    public provider: gitlab.Provider;

    /**
     * [TODO:description]
     *
     * @param {string} name - [TODO:description]
     * @param {object} args - [TODO:description]
     * @param {object} opts - [TODO:description]
     */
    public constructor (
        name: string,
        args: gitlab.ProviderArgs,
        opts?: pulumi.CustomResourceOptions
    ) {
        this.name = name;
        this.provider = new gitlab.Provider(this.name, args, opts);
    }

}

