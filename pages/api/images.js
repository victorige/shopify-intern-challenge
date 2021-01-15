// an api for dummy images

import dataImage from '../../customData';

export default async function handler(req, res) { 
    const { method } = req;
    switch(method){
        case 'GET':
            try {

                return res.status(200).json({ 
                    message: "Success",
                    data: dataImage
                });

            }catch(error){
                return res.status(404).json({ message: error.message });
            }
        
        default:
            return res.status(400).json({ message: "Only get requests are allowed." });
    }
 }