const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const books = [
	{
		id: 'asdksmadlkamsd',
		title: 'The Awakening',
		author: 'Kate Chopin',
		score: 5.9,
		isPublished: true,
	},
	{
		id: 'şöşsldöfssd',
		title: 'City of Glass',
		author: 'Paul Auster',
		score: 4.9,
		isPublished: false,
	},
];

const typeDefs = gql`
	type Book {
		id: ID!
		title: String
		author: String
		score: Float
		isPublished: Boolean
	}

	type Query {
		books: [Book]
	}
`;

const resolvers = {
	Query: {
		books: () => books,
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
