const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const { users, posts, comments } = require('./data');

const typeDefs = gql`
	type User {
		id: ID!
		fullName: String!
		posts: [Post]
	}
	type Post {
		id: ID!
		title: String!
		user: User
		user_id: ID!
		comments: [Comment]
	}
	type Comment {
		id: ID!
		text: String!
		post_id: ID!
	}
	type Query {
		users: [User!]
		user(id: ID!): User

		posts: [Post!]
		post(id: ID!): Post

		comments: [Comment!]
		comment(id: ID!): Comment
	}
`;

const resolvers = {
	Query: {
		users: () => users,
		user: (_, { id }) => users.find((user) => user.id === id),

		posts: () => posts,
		post: (_, { id }) => posts.find((post) => post.id === id),

		comments: () => comments,
		comment: (_, { id }) => comments.find((comment) => comment.id === id),
	},
	User: {
		posts: (user) => posts.filter((post) => post.user_id === user.id),
	},
	Post: {
		user: (post) => users.find((user) => user.id === post.user_id),
		comments: (post) => comments.filter((comment) => comment.post_id === post.id),
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
