import { GraphQLError, parse, print } from "graphql";
import { GraphQLDocument } from "../";
import test from "ava";

test("parseLiteral returns null when given a null", (t): void => {
    const doc = GraphQLDocument.parseLiteral({
        kind: "NullValue",
        value: "null",
    }, undefined);
    t.is(doc, null);
});

test("parseLiteral throws error for non string value node", (t): void => {
    t.throws(
        (): void => {
            GraphQLDocument.parseLiteral({
                kind: "IntValue",
                value: "1234",
            }, undefined);
        },
        new GraphQLError("GraphQLDocument: Can only parse StringValue literals"),
    )
});

test("parseLiteral throws error for an invalid document string", (t): void => {
    t.throws(
        (): void => {
            GraphQLDocument.parseLiteral({
                kind: "StringValue",
                value: "{",
            }, undefined);
        },
        new GraphQLError("GraphQLDocument: Syntax Error: Expected Name, found <EOF>"),
    )
});

test("parseLiteral returns document node when given a valid document string", (t): void => {
    const doc = GraphQLDocument.parseLiteral({
        kind: "StringValue",
        value: "{ hello }",
    }, undefined);
    t.is(doc.kind, "Document");
    t.is(print(doc), "{\n  hello\n}\n");
});

test("parseValue returns null when given a null", (t): void => {
    const doc = GraphQLDocument.parseValue(null);
    t.is(doc, null);
});

test("parseValue returns null when given an undefined", (t): void => {
    const doc = GraphQLDocument.parseValue(undefined);
    t.is(doc, null);
});

test("parseValue throws error for non string value node", (t): void => {
    t.throws(
        (): void => {
            GraphQLDocument.parseValue(1234);
        },
        new GraphQLError("GraphQLDocument: Can only parse string values"),
    )
});

test("parseValue throws error for an invalid document string", (t): void => {
    t.throws(
        (): void => {
            GraphQLDocument.parseValue("{");
        },
        new GraphQLError("GraphQLDocument: Syntax Error: Expected Name, found <EOF>"),
    )
});

test("parseValue returns document node when given a valid document string", (t): void => {
    const doc = GraphQLDocument.parseValue("{ hello }");
    t.is(doc.kind, "Document");
    t.is(print(doc), "{\n  hello\n}\n");
});

test("serialize null value returns null", (t): void => {
    t.is(GraphQLDocument.serialize(null), null);
});

test("serialize undefined value returns null", (t): void => {
    t.is(GraphQLDocument.serialize(undefined), null);
});

test("serialize non DocumentNode throws error", (t): void => {
    t.throws(
        (): void => {
            GraphQLDocument.serialize({});
        },
        new GraphQLError("GraphQLDocument: Can only serialize DocumentNode values"),
    )
});

test("serialize DocumentNode value returns string", (t): void => {
    t.is(
        GraphQLDocument.serialize(parse("{ hello }")),
        "{\n  hello\n}\n",
    );
});

