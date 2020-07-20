
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('order')
    try {
        const orders = await collection.find().toArray();
        // var orders = await collection.aggregate([
        //     {
        //         $match: filterBy
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'byUserId',
        //             foreignField: '_id',
        //             as: 'byUser'
        //         }
        //     }, 
        //     {
        //         $unwind: '$byUser'
        //     },
        //     {
        //         $lookup:
        //         {
        //             from: 'user',
        //             localField: 'aboutUserId',
        //             foreignField: '_id',
        //             as: 'aboutUser'
        //         }
        //     }, 
        //     {
        //         $unwind: '$aboutUser'
        //     }
        // ]).toArray()
        return orders
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }
}

async function remove(orderId) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.deleteOne({ "_id": ObjectId(orderId) })
    } catch (err) {
        console.log(`ERROR: cannot remove order ${orderId}`)
        throw err;
    }
}


async function add(order) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.insertOne(order);
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {};
//     return criteria;
// }

module.exports = {
    query,
    remove,
    add
}


