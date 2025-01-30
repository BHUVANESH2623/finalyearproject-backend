import busRouteModel from "../model/busroute.js";

export const busroutes = async(req , res) => {
    try{
        const result=await busRouteModel.find();
        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
    }
};