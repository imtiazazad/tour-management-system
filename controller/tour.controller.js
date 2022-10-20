const { getTourService, createTourService, getTourIdService, updateTourIdServer, getTrendingService, getCheapestService } = require("../service/tour.service");

exports.getTours = async (req, res) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit'];

        excludeFields.forEach(field => delete filters[field]);

        let filterStrings = JSON.stringify(filters);

        filterStrings = filterStrings.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filters = JSON.parse(filterStrings);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join();
            queries.sortBy = sortBy;
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }
        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt((limit));
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const tours = await getTourService(filters, queries);

        res.status(200).json({
            status: "Successful",
            data: tours
        })

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Get Request Failed",
            error: error.message
        })
    }
}

// ......................

exports.saveATour = async (req, res) => {
    try {
        const result = await createTourService(req.body);

        res.status(200).json({
            stats: "Successful",
            message: "Successfully Saved Product",
            data: result
        })
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't Save Tour",
            error: error.message,
        })
    }
}

exports.getTourById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await getTourIdService(id);
        result.views += 1;
        const updatedResult = await updateTourIdServer(id, result);

        res.status(200).json({
            status: "Successful",
            message: "Successfully found Tour",
            data: updatedResult,
        })
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed To Get Specific Tour",
            error: error.message
        })
    }
}

exports.updateTourById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await updateTourIdServer(id, req.body);

        res.status(200).json({
            status: "Successful",
            message: "Successfully Found Tour",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Couldn't Update Tour",
            error: error.message,
        })
    }
}

exports.getTrending = async (req, res) => {
    try {
        const result = await getTrendingService();

        res.status(200).json({
            status: "Successful",
            message: "Successfully Found Trending",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Failed To Get Trending",
            error: error.message
        })
    }
}

exports.getCheapest = async (req, res) => {
    try {
        const result = await getCheapestService();

        res.status(200).json({
            status: "Successful",
            message: "Successfully Found Trending",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: " Failed To Get Trending",
            error: error.message
        })
    }
}