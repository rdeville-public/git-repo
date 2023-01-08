import type * as provider from "../../src/provider";
import {GitlabProvider, providerFactory} from "../../src/provider/";
import test from "ava";

const PROVIDERNAME = "fakename.tld";
const DATA: provider.ProviderData = {
    "args": {
        "baseUrl": "https://fake.gitlab.tld",
        "token": "abcdefghhijklmnop"
    },
    "opts": {
        "aliases": [{"name": "fakeProvider"}]
    }
};

test(
    "Unsupported git provider",
    (currTest) => {
        const gitType = "wrongType";
        const errorMsg = `Git provider type not supported: "${gitType}"`;
        const error = currTest.throws(() => {
            providerFactory(gitType, PROVIDERNAME, DATA);
        }, {"instanceOf": Error}, errorMsg);

        currTest.is(error?.message, errorMsg);
    }
);

test(
    "Gitlab git provider",
    (currTest) => {
        const gitType = "gitlab";
        const provider = providerFactory(gitType, PROVIDERNAME, DATA);

        currTest.is(typeof provider, typeof GitlabProvider.prototype);
    }
);

