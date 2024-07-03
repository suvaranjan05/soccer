const Field = require('../models/Field');

const addField = async (req, res) => {
    try {
        const {
            name,
            location,
            postalCode,
            photo,
            fee,
            shower,
            toilet,
            childrenPlayground,
            foodCourtNearby
        } = req.body;

        const field = new Field({
            name,
            location,
            postalCode,
            photo,
            fee,
            shower,
            toilet,
            childrenPlayground,
            foodCourtNearby
        });

        await field.save();
        res.status(201).json({ msg: 'Field created successfully', field });
    } catch (error) {
        console.error('Error creating field:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getFields = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified

        const startIndex = (page - 1) * limit;

        // Get the total count of all fields
        const totalCount = await Field.countDocuments();

        // Find fields with pagination and selecting specific fields
        const fields = await Field.find()
            .select('name location photo')
            .skip(startIndex)
            .limit(limit);

        // Prepare the response object
        const results = {
            totalCount,
            fields,
        };

        // Check if there is a next page
        if (startIndex + limit < totalCount) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        // Check if there is a previous page
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching all fields:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getFieldsBySearch = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 3; // Default to 3 items per page if not specified
        const { keyword } = req.body; // Get the search keyword

        const startIndex = (page - 1) * limit;

        // Create a case-insensitive regular expression for the search keyword
        const searchRegex = new RegExp(keyword, 'i');

        // Find fields matching the search keyword with pagination
        const fields = await Field.find({ name: searchRegex })
            .select('name location photo') // Select only name, location, and photo fields
            .skip(startIndex)
            .limit(limit)
            .lean();

        // Get the total count of fields matching the search keyword
        const totalCount = await Field.countDocuments({ name: searchRegex });

        // Prepare the response object
        const results = {
            totalCount,
            fields,
        };

        // Check if there is a next page
        if (startIndex + limit < totalCount) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        // Check if there is a previous page
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json(results);
    } catch (error) {
        console.log('Error fetching fields by search:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllFields = async (req, res) => {
    try {
        // Find all fields and select specific fields
        const fields = await Field.find()
            .select('name location fee');

        // Check if any fields are found
        if (fields.length === 0) {
            return res.status(404).json({ msg: 'No fields found' });
        }

        // Respond with the fields
        res.status(200).json(fields);
    } catch (error) {
        console.error('Error fetching all fields:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


module.exports = {
    addField, getFields, getFieldsBySearch, getAllFields
};
