import busRouteModel from "../model/busroute.js";
import jwt from 'jsonwebtoken';
import db from "../mysqldb.js"

export const getRoutes = async(req , res) => {
    try{
        const result=await busRouteModel.find();
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(500).json("getRoute error")
    }
};

export const postRoute = async (req , res) => {
    const token = req.cookies?.bus_tracking_key;
    if(!token) return res.status(403).json("User not logged in");
    jwt.verify(token ,process.env.SECRET_KEY, (err,data)=>{
        if(err) return res.status(500).json("error in adding the route");
        const q = `SELECT * FROM admins WHERE name = ? AND email = ?`;
        db.query(q,[data.name , data.email],async(err,data)=>{
            if(err) return res.status(500).json("internal error");
            if(data.length === 0) return res.status(409).json("Permission denied");
            const {routeName,driverId,stops} = req.body;
            const routeId = await busRouteModel.countDocuments({}) + 1;

            const newRoute = new busRouteModel({
                routeId,
                routeName,
                driverId,
                stops
            });

            try {
                await newRoute.save();
                return res.status(200).json("New route added successfully");
            } catch (error) {
                return res.status(500).json("Error in creating new routes");
            }
        })

    })
};

export const getRoute = async (req , res) => {
    try {
        const routeName = req.params.routeName;
        const result = await busRouteModel.findOne({routeName})
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json("getRoute error")
    }
};

export const searchRoute = async (req , res) => {
    try {
        const routeName = req.body.routeName;
        if (!routeName) {
            return res.status(400).json({ message: "Route name is required" });
        }
        const result = await busRouteModel.findOne({
            routeName: { $regex: new RegExp(`^${routeName}$`, 'i') }
        });
        if (!result) {
            return res.status(404).json({ message: "Route not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json("getRoute error")
    }
};

export const searchLocation = async (req , res) => {
    try {
        const location = req.body.location;  // Get the search term from the request body
        if (!location) {
            return res.status(400).json({ message: "Location is required" });
        }
        // Aggregation Pipeline using Mongoose
        const pipeline = [
            { $unwind: "$stops" },  // Unwind the stops array
            {
                $match: {
                    $or: [
                        { "stops.stopName": { $regex: location, $options: "i" } },  // Match stopName
                        { "stops.place": { $regex: location, $options: "i" } },     // Match place
                        { "routeName": { $regex: location, $options: "i" } }        // Match routeName
                    ]
                }
            },
            {
                $project: {
                    _id: 0,               // Exclude _id from results
                    routeName: 1,         // Include routeName
                    routeId: 1,         // Include routeName
                    "stops.stopName": 1,  // Include stopName
                    "stops.place": 1      // Include place
                }
            }
        ];
        // Execute the aggregation using Mongoose model
        const results = await busRouteModel.aggregate(pipeline);
        if (results.length === 0) {
            return res.status(404).json({ message: "No matching locations found" });
        }
        return res.status(200).json(results);  // Send the matching results as JSON

    } catch (error) {
        console.log(error);
        return res.status(500).json("searchLocation error");
    }
};