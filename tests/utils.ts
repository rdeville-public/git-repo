import * as utils from "../src/utils";
import test from "ava";

const ENV: {[key: string]: string} = {
    "fakeToken": "FAKEVALUE"
};

Object.entries(ENV).forEach(([key, val]) => {
    process.env[key] = val;
});

// Utils.getValue testing
test("getValue wrong subkey error", (currTest) => {
    const fakeData = {
        "wrongKey": "WRONGTOKEN"
    };
    const fakeParent = "fakeParent";
    // eslint-disable-next-line max-len
    const errorMsg = `Pulumi config key '${fakeParent}' should have a subkey valid among (cmd | env)`;
    const error = currTest.throws(
        () => {
            utils.getValue(fakeParent, fakeData);
        },
        {"instanceOf": Error}
    );

    currTest.is(error?.message, errorMsg);
});

test("getValue \"cmd\" working", (currTest) => {
    const fakeData = {"cmd": "true"};
    const fakeParent = "fakeParent";
    const value = utils.getValue(fakeParent, fakeData);

    currTest.snapshot(value);
});

test("getValue \"cmd\" error", (currTest) => {
    const fakeData = {
        "cmd": "false"
    };
    const fakeParent = "fakeParent";
    const errorMsg = `Command ${fakeData.cmd} exited with following error: \n`; // eslint-disable-line max-len
    const error = currTest.throws(
        () => {
            utils.getValue(fakeParent, fakeData);
        },
        {"instanceOf": Error}
    );
    currTest.is(error?.message, errorMsg);
});

test("getValue \"env\" working", (currTest) => {
    const fakeData = {"env": "fakeToken"};
    const fakeParent = "fakeParent";
    const value = utils.getValue(fakeParent, fakeData);

    currTest.snapshot(value);
});

test("getValue \"env\" error", (currTest) => {
    const fakeData = {"env": "wrongToken"};
    const fakeParent = "fakeParent";
    const errorMsg = `Environment variable '${fakeData.env}' does not exists`;
    const error = currTest.throws(
        () => {
            utils.getValue(fakeParent, fakeData);
        },
        {"instanceOf": Error}
    );

    currTest.is(error?.message, errorMsg);
});

test("getValue \"string\" working", (currTest) => {
    const fakeData = "fakeValue";
    const fakeParent = "fakeParent";
    const value = utils.getValue(fakeParent, fakeData);

    currTest.is(value, "fakeValue");
});


