import mongoose from "mongoose";

const busRouteSchema = mongoose.Schema({
    routeId: Number,
    routeName: String,
    driverId: String,
    stops: [
        {
            stopNo: Number,
            stopName: String,
            place: String
        }
    ]
})

const busRouteModel = mongoose.model('busRoutes',busRouteSchema);

export default busRouteModel;