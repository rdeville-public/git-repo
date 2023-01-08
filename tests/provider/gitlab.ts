import * as gitlab from "../../src/provider/gitlab";
import type * as provider from "../../src/provider";
// TMP import * as pulumiGitlab from "@pulumi/gitlab";
import test from "ava";

test("gitlabProvider", (currTest) => {
    const data: provider.ProviderData = {
        "args": {
            "baseUrl": "https://fake.gitlab.tld",
            "token": "abcdefghhijklmnop"
        },
        "opts": {
            "aliases": [{"name": "fakeProvider"}]
        }
    };
    const gitlabProvider = new gitlab.GitlabProvider(
        "foo",
        data.args,
        data.opts
    );

    currTest.snapshot(gitlabProvider);
});

