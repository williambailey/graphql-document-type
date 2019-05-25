GraphQLDocument [`graphql-document-type`](https://www.npmjs.com/package/graphql-document-type)
=============================================

[![Build Status](https://travis-ci.com/williambailey/graphql-document-type.svg?branch=master)](https://travis-ci.com/williambailey/graphql-document-type)

A `GraphQLDocument` scalar type for use in your GraphQL schema.

## Usage

```ts
import { DocumentNode, GraphQLObjectType, parse } from "graphql";
import { GraphQLDocument } from 'graphql-document-type';

const MyObjectType = new GraphQLObjectType({
    fields: {
        graphqlDocument: {
            resolve: (): DocumentNode => parse("{ hello }"),
            type: GraphQLDocument,
        },
    },
    name: "MyObject",
});
```