const Tour = require("../models/Tour");

exports.getTourService = async (filter, { skip, limit = 10, sortBy, fields }) => {
    const tours = await Tour.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sortBy)
        .select(fields);
    const totalTour = await Tour.countDocuments(filter);
    const pageCount = Math.ceil(totalTour / limit)
    return { totalTour, pageCount, tours };
}

exports.createTourService = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}

exports.getTourIdService = async (id) => {
    const tour = await Tour.findById(id);
    return tour;
}

exports.updateTourIdServer = async (id, data) => {
    const tour = await Tour.findById(id);
    const result = await tour.set(data).save();
    return result;
}

exports.getTrendingService = async () => {
    const tours = await Tour.find({}).sort({ views: -1 }).limit(3);
    return tours;
}

exports.getCheapestService = async () => {
    const tours = await Tour.find({}).sort({ price: 1 }).limit(3);
    return tours;
}