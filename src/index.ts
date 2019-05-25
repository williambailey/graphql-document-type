import { DocumentNode, Kind, ValueNode } from "graphql/language";
import { GraphQLError, GraphQLScalarType, Source, parse, print } from "graphql";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDocumentNode(obj: any): obj is DocumentNode {
    return (
        typeof obj === "object"
        && "kind" in obj
        && obj.kind === "Document"
    );
}

export const GraphQLDocument = new GraphQLScalarType({
    description: "A GraphQL document",
    name: "GraphQLDocument",
    parseLiteral(ast: ValueNode): DocumentNode | null {
        if (ast.kind === Kind.NULL) {
            return null;
        }
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(`${GraphQLDocument.name}: Can only parse ${Kind.STRING} literals`, ast);
        }
        try {
            return parse(new Source(ast.value, "GraphQL Literal"));
        } catch (e) {
            e.message = `${GraphQLDocument.name}: ${e.message}`;
            throw e;
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseValue(value: any): DocumentNode | null {
        if (value === null || value === undefined) {
            return null;
        }
        if (typeof (value) !== "string") {
            throw new GraphQLError(`${GraphQLDocument.name}: Can only parse string values`);
        }
        try {
            return parse(new Source(value, "GraphQL Value"));
        } catch (e) {
            e.message = `${GraphQLDocument.name}: ${e.message}`;
            throw e;
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    serialize(value: any): string | null {
        if (value === null || value === undefined) {
            return null;
        }
        if (!isDocumentNode(value)) {
            throw new GraphQLError(`${GraphQLDocument.name}: Can only serialize DocumentNode values`);
        }
        return print(value);
    },
});
