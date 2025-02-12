import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type User {
        id: ID!
        userName: String
        password: String
        name: String
        email: String
        age: Int
    }
    
    type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }
    
    type Mutation {
        createUser(userName: String!, password: String!, name: String, email: String!, age: Int): User
    }
`);

export default schema;