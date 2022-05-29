const users = [
	{
		id: '1',
		fullName: 'John Doe',
	},
	{
		id: '2',
		fullName: 'Harry Potter',
	},
];

const posts = [
	{
		id: '1',
		title: 'The Awakening',
		user_id: '1',
	},
	{
		id: '2',
		title: 'DEneme',
		user_id: '1',
	},
	{
		id: '3',
		title: 'City of Glass',
		user_id: '2',
	},
];

const comments = [
	{
		id: '1',
		text: 'The book is awesome',
		post_id: '1',
	},
	{
		id: '2',
		text: 'The book is awesome',
		post_id: '1',
	},
	{
		id: '3',
		text: 'The book is awesome',
		post_id: '2',
	},
	{
		id: '4',
		text: 'The book is awesome',
		post_id: '3',
	},
];

module.exports = {
	users,
	posts,
	comments,
};
