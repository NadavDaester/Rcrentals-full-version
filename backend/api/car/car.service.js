const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('car')
    try {
        const cars = await collection.find(criteria).toArray();
        return cars
    } catch (err) {
        console.log('ERROR: cannot find cars')
        throw err;
    }
}

async function getById(carId) {
    const collection = await dbService.getCollection('car')
    try {
        const car = await collection.findOne({ "_id": ObjectId(carId) })
        return car
    } catch (err) {
        console.log(`ERROR: while finding car ${carId}`)
        throw err;
    }
}

async function remove(carId) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.deleteOne({ "_id": ObjectId(carId) })
    } catch (err) {
        console.log(`ERROR: cannot remove car ${carId}`)
        throw err;
    }
}

async function update(car) {
    const collection = await dbService.getCollection('car')
    car._id = ObjectId(car._id);

    try {
        await collection.replaceOne({ "_id": car._id }, { $set: car })
        return car
    } catch (err) {
        console.log(`ERROR: cannot update car ${car._id}`)
        throw err;
    }
}

async function add(car) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.insertOne(car);
        return car;
    } catch (err) {
        console.log(`ERROR: cannot insert car`)
        throw err;
    }
}





// function _buildCriteria(filterBy) {
//     if(filterBy){
//         const criteria = {};

//     }else return null

// }



function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.type !== '') criteria.type = filterBy.type;

    // if (filterBy.model) criteria.model = { $regex: new RegExp(filterBy.model, 'i') };
    // if (filterBy.location) criteria.name = { $regex: new RegExp(filterBy.location, 'i') };
    // if (filterBy.available !== '') criteria.available = (filterBy.available + '' === 'true') ? true : false;

    // if (filterBy.price) criteria.name = { $regex: new RegExp(filterBy.name, 'i') };
    // console.log('car.service criteria:', criteria)
    return criteria;
}