import db from '../config/db'
import { 
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
 } from 'graphql';


const Book = new GraphQLObjectType({
    name: 'Book',
    description: 'a book',
    fields: () => {
        return {
            id: {
                type: GraphQLString,
                resolve(book) {
                    return book.id
                }
            },
            title: {
                type: GraphQLString,
                resolve(book) {
                    return book.title
                }
            },
            authorLast: {
                type: GraphQLString,
                resolve(book) {
                    return book.authorLast
                }
            },
            authorFirst: {
                type: GraphQLString,
                resolve(book) {
                    return book.authorFirst
                }
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'root query',
    fields: () => {
        return {
            books: {
                type: new GraphQLList(Book),
                args: {
                    id: {
                        type: GraphQLString
                    },
                    title: {
                        type: GraphQLString
                    },
                    authorLast: {
                        type: GraphQLString
                    },
                    authorFirst: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return db.models.books.findAll({where:args})
                }
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'add books',
    fields() {
        return {
            addBook: {
                type: Book,
                args: {
                    title: {
                        type: GraphQLString!
                    },
                    authorLast: {
                        type: GraphQLString!
                    },
                    authorFirst: {
                        type: GraphQLString!
                    }
                },
                resolve(_, args) {
                    return db.models.books.create({
                        title: args.title,
                        authorLast: args.authorLast,
                        authorFirst: args.authorFirst
                    })
                }
            }
        }
    },
})

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

export default Schema;