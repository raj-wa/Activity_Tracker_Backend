const Activity = require('../../model/activity/activity.model')
const User = require('../../model/user/user.model')

var ObjectID = require('mongoose').Types.ObjectId

const createActivity = async (req, res) => {
    try {
        let params = req.body
        if (params.title) {
            const userData = await User.find({ _id: req.body.userId })
            console.log("userData :: ", userData);

            if (userData.length == 0) {
                return res.json({ error: 'User Not Found' })
            }

            let activities = await Activity.find({ userId: req.body.userId }).populate('userId')
            for (let activity of activities) {
                if (activity.title == params.title) {
                    return res.json({ error: 'You cant add duplicate entry ' })
                }
            }
        }
        let activity = await Activity.create(params)
        return res.status(200).json(activity);
    } catch (error) {
        return res.json({ error: 'error while create activity' })
    }
}

const getActivitiesByUserId = async (req, res) => {
    try {
        let activity = await Activity.find({ userId: req.body.userId }).populate('userId')
        return res.status(200).json(activity);
    } catch (error) {
        return res.json({ error: 'error while get activity data' })
    }
}

const updateActivityById = async (req, res) => {
    try {
        let params = req.body
        let activityId = params.activityId
        let activityDetailId = params.activityDetailId
        let activityDate = params.date

        let findActivity = await Activity.findOne({ _id: activityId })
        console.log('activityId-----', findActivity);

        let activityArray = findActivity.activity;
        if (activityDetailId != "") {
            if (activityArray.length > 0) {
                activityArray.map((obj) => {
                    if (obj._id == activityDetailId) {
                        obj.isTrue = !obj.isTrue;
                    }
                })
            }
        } else {
            activityArray.push({
                isTrue: true,
                date: activityDate
            })
        }

        findActivity.activity = activityArray;
        const updatedObj = await Activity.findOneAndUpdate({ _id: activityId }, findActivity, { new: true })
        return res.status(200).json(updatedObj);
    } catch (error) {
        return res.json({ error: 'error while get activity data' })
    }
}

const deleteActivitiesByUserId = async (req, res) => {
    try {

        let params = req.body

        if (!ObjectID.isValid(params.activityId))
            return res.status(400).send('No record with given id : ' + params.activityId)

        console.log("Activity :: ", Activity, params.activityId);
        Activity.findOneAndRemove({ _id: params.activityId }, function (err, docs) {
            if (!err) res.status(200).json("data Delete");
            else res.status(205).json("data not Delete");
        });

    } catch (error) {
        console.log("error :: ", error)
        return res.json({ error: 'error while get activity data' })
    }
}

module.exports = {
    createActivity,
    getActivitiesByUserId,
    updateActivityById,
    deleteActivitiesByUserId
}