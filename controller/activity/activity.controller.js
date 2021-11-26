const Activity = require('../../model/activity/activity.model')

const createActivity = async (req, res) => {
    try {
        let params = req.body
        if(params.title){
            let activities = await Activity.find({ userId: req.body.userId }).populate('userId')
            for(let activity of activities){
                if(activity.title == params.title){
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
        const updatedObj = await Activity.findOneAndUpdate({ _id: activityId },findActivity,{new:true} )
        return res.status(200).json(updatedObj);
    } catch (error) {
        return res.json({ error: 'error while get activity data' })
    }
}

module.exports = {
    createActivity,
    getActivitiesByUserId,
    updateActivityById
}