import { isAuthorized } from "../handlers/authMiddleware";
import { upload } from "../handlers/fileHandlers";
import { createVaccineAllergiesData, createVaccineData, deleteVaccineData, getVaccineData, updateVaccineData } from "../modules/vaccineModule/controller";



module.exports = (router: any) => {
    router.get('/vaccine', isAuthorized, getVaccineData)
    router.post('/vaccine', isAuthorized, upload.single('image'), createVaccineData)
    router.patch('/vaccine/:vaccine_id', isAuthorized, upload.single('image'), updateVaccineData)
    router.delete('/vaccine/:vaccine_id', isAuthorized, deleteVaccineData)

    router.post('/vaccineAllergies/:vaccine_id', isAuthorized, createVaccineAllergiesData)
}