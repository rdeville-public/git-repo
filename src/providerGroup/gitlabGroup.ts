import * as gitlab from "@pulumi/gitlab";
import * as pulumi from "@pulumi/pulumi";

export interface IGitlabGroup {
    group: gitlab.Group | undefined;
    accessTokens: gitlab.GroupAccessToken[];
    badges: gitlab.GroupBadge[];
    hooks: gitlab.GroupHook[];
    label: gitlab.GroupLabel[];
    variables: gitlab.GroupVariable[];
}

/**
 * [TODO:description]
 *
 * @augments pulumi.ComponentResource
 * @implements {IGitlabGroup} IGitlabGroup
 */
export class GitlabGroup extends pulumi.ComponentResource
    implements IGitlabGroup {

    public group: gitlab.Group | undefined;

    public accessTokens: gitlab.GroupAccessToken[] = [];

    public badges: gitlab.GroupBadge[] = [];

    public hooks: gitlab.GroupHook[] = [];

    public label: gitlab.GroupLabel[] = [];

    public variables: gitlab.GroupVariable[] = [];

    /**
     * [TODO:description]
     *
     * @param {string} name - [TODO:description]
     * @param {object} args - [TODO:description]
     * @param {object} opts - [TODO:description]
     */
    public constructor (name: string, args: object = {}, opts: object = {}) {
        super("git-repo:gitlab-group", name, args, opts);
    }

    /**
     * [TODO:description]
     *
     */
    private createGroup(
        name: string,
        args: gitlab.GroupArgs,
        opts: pulumi.CustomResourceOptions
    ): void {
        this.group = new gitlab.Group(name, args, opts);
        // eslint-disable-next-line
        pulumi.log.error("TODO: Implement createGroup() method").catch(() => {});

    }


}

