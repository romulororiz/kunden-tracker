const clients = [
	{
		user: '63b741dde38b6436490ffedb',
		firstName: 'John',
		lastName: 'Smith',
		address: {
			city: 'New York',
			street: '123 Main St',
			houseNumber: 'Apt 3',
			postalCode: '10001',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b70b1e0853942061c76a65',
		firstName: 'Jane',
		lastName: 'Doe',
		address: {
			city: 'Los Angeles',
			street: '456 Market St',
			houseNumber: '1',
			postalCode: '90001',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T10:00:00'),
				endTime: new Date('2022-01-03T18:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T10:00:00'),
				endTime: new Date('2022-01-04T18:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T10:00:00'),
				endTime: new Date('2022-01-05T18:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',
		firstName: 'John',
		lastName: 'Smith',
		address: {
			city: 'New York',
			street: '123 Main St',
			houseNumber: 'Apt 3',
			postalCode: '10001',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',

		firstName: 'Bob',
		lastName: 'Johnson',
		address: {
			city: 'Chicago',
			street: '789 Elm St',
			houseNumber: '2',
			postalCode: '60601',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b70b1e0853942061c76a65',

		firstName: 'Emily',
		lastName: 'Williams',
		address: {
			city: 'Houston',
			street: '321 Pine St',
			houseNumber: '3',
			postalCode: '77001',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',

		firstName: 'Bob',
		lastName: 'Johnson',
		address: {
			city: 'Chicago',
			street: '789 Elm St',
			houseNumber: '2',
			postalCode: '60601',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',

		firstName: 'Bob',
		lastName: 'Johnson',
		address: {
			city: 'Chicago',
			street: '789 Elm St',
			houseNumber: '2',
			postalCode: '60601',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',
		firstName: 'John',
		lastName: 'Smith',
		address: {
			city: 'New York',
			street: '123 Main St',
			houseNumber: 'Apt 3',
			postalCode: '10001',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',

		firstName: 'Bob',
		lastName: 'Johnson',
		address: {
			city: 'Chicago',
			street: '789 Elm St',
			houseNumber: '2',
			postalCode: '60601',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',

		firstName: 'James',
		lastName: 'Smith',
		address: {
			city: 'Philadelphia',
			street: '654 Maple St',
			houseNumber: '3',
			postalCode: '19101',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b741dde38b6436490ffedb',
		firstName: 'John',
		lastName: 'Smith',
		address: {
			city: 'New York',
			street: '123 Main St',
			houseNumber: 'Apt 3',
			postalCode: '10001',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
	{
		user: '63b70b1e0853942061c76a65',
		firstName: 'John',
		lastName: 'Smith',
		address: {
			city: 'New York',
			street: '123 Main St',
			houseNumber: 'Apt 3',
			postalCode: '10001',
		},
		workingHours: [
			{
				day: new Date('2022-01-03'),
				startTime: new Date('2022-01-03T09:00:00'),
				endTime: new Date('2022-01-03T17:00:00'),
			},
			{
				day: new Date('2022-01-04'),
				startTime: new Date('2022-01-04T09:00:00'),
				endTime: new Date('2022-01-04T17:00:00'),
			},
			{
				day: new Date('2022-01-05'),
				startTime: new Date('2022-01-05T09:00:00'),
				endTime: new Date('2022-01-05T17:00:00'),
			},
		],
	},
];

module.exports = clients;
