import httpStatus from "http-status";
import { getPagingData, responseHandler } from "../../handlers/responseHandler";
import { Vaccine } from "./domain";
import { Vaccine_allergies } from "./vaccine_allergies.domain";




//@desc function for getting all vaccine info and count for pagination
export const getAllVaccineData = async (limit: number, offset: number, page: number, queryset: any) => {
  try {

    const data = await Vaccine.findAndCountAll({ limit: limit, offset: offset, where: queryset, order: [['isMandatory', 'DESC'], ['vaccine_name', "ASC"]], include: [{ model: Vaccine_allergies }] });
    return getPagingData(data, page, limit)
  } catch (err) {
    return err
  }
}

export const getSingleVaccineData = async (id: string) => {
  try {
    const data = await Vaccine.findByPk(id, {
      include: [{ model: Vaccine_allergies }]
    });
    return data
  } catch (err) {
    return err
  }
}

//@desc function for creating vaccine
export const createVaccine = async (info: any, res: any) => {
 
  try {
    var body_ = { ...info.body, vaccine_image: info?.file?.path }
   
    const vaccineData = await Vaccine.create(body_)
    return responseHandler(res, httpStatus["CREATED"], true, vaccineData, null, "Vaccine Created Successfull.", null)
  } catch (err) {
    console.log(err)
    return responseHandler(res, httpStatus["NOT_ACCEPTABLE"], false, null, err, "Error while creating vaccine.", null)
  }
}

export const updateVaccineInfo = async (info: any, res: any) => {
  try {
    const body = info.body
    var body_ = { ...body, vaccine_image: info?.file?.path }
    const updatedVaccineData = await Vaccine.update(body_, { where: { id: info.params['vaccine_id'] } })
    return responseHandler(res, httpStatus['OK'], true, updatedVaccineData, null, "Data updated sucessfully.", null)
  } catch (err) {
    responseHandler(res, httpStatus['NOT_ACCEPTABLE'], false, null, err, "Not Acceptable.", null)
  }

}

export const deleteVaccineInfo = async (info: any, res: any) => {
  try {
    const vaccine_id = info.params['vaccine_id'];
    const updatedVaccineData = await Vaccine.update({ isDeleted: true }, { where: { id: vaccine_id } })
    return responseHandler(res, httpStatus['OK'], true, updatedVaccineData, null, "Data deleted sucessfully.", null)
  } catch (err) {
    responseHandler(res, httpStatus['NOT_ACCEPTABLE'], false, null, err, "Not Acceptable.", null)
  }

}

export const createVaccineAllergies = async (data: any, res: any) => {
  try {
    const body = { ...data.body, vaccine_id: data.params['vaccine_id'], }
    const vaccineData = await Vaccine_allergies.create(body)
    return responseHandler(res, httpStatus["CREATED"], true, vaccineData, null, "vaccine Created Successfull.", null)
  } catch (err) {
    return responseHandler(res, httpStatus["NOT_ACCEPTABLE"], false, null, err, "Error while creating vaccine.", null)
  }
}