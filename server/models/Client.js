const mongoose = require('mongoose');

const clientSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		address: {
			city: {
				type: String,
				required: true,
				trim: true,
			},
			street: {
				type: String,
				required: true,
				trim: true,
			},
			houseNumber: {
				type: String,
				required: true,
				trim: true,
			},
			postalCode: {
				type: String,
				required: true,
				trim: true,
			},
		},
		workingHours: [
			{
				day: { type: Date, required: true },
				startTime: { type: Date, required: true },
				endTime: { type: Date, required: true },
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Client', clientSchema);
