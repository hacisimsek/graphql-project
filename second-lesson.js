const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

// const { books, authors } = require('./data');
// const authors = [
// 	{
// 		id: '1',
// 		name: 'John',
// 		surName: 'Doe',
// 		age: 30,
// 	},
// 	{
// 		id: '2',
// 		name: 'Harry',
// 		surName: 'Potter',
// 		age: 25,
// 	},
// ];
// const books = [
// 	{
// 		id: '1',
// 		title: 'The Awakening',
// 		author_id: '1',
// 		score: 5.9,
// 		isPublished: true,
// 	},
// 	{
// 		id: '3',
// 		title: 'DEneme',
// 		author_id: '1',
// 		score: 6.9,
// 		isPublished: false,
// 	},
// 	{
// 		id: '2',
// 		title: 'City of Glass',
// 		author_2: '2',
// 		score: 4.9,
// 		isPublished: false,
// 	},
// ];

// module.exports = {
// 	authors,
// 	books,
// };

const typeDefs = gql`
	type Author {
		id: ID!
		name: String!
		surName: String
		age: Int
		books(filter: String): [Book!]
	}

	type Book {
		id: ID!
		title: String!
		author: Author
		author_id: String!
		score: Float
		isPublished: Boolean
	}

	type Query {
		books: [Book!]
		book(id: ID!): Book!
		authors: [Author!]
		author(id: ID!): Author!
	}
`;

const resolvers = {
	Query: {
		books: () => books,
		book: (parent, args) => books.find((book) => book.id === args.id),
		authors: () => authors,
		author: (_, { id }) => authors.find((author) => author.id === id),
	},
	Book: {
		author: (parent) => authors.find((author) => author.id === parent.author_id),
	},
	Author: {
		books: (parent, { filter }) => {
			if (!filter) {
				return books.filter((book) => book.author_id === parent.id);
			}

			return books.filter(
				(book) => book.author_id === parent.id && book.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
			);
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [
		ApolloServerPluginLandingPageGraphQLPlayground({
			// options
		}),
	],
});

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
