import { Request, Response } from "express";
import httpStatus from "http-status";
import { getPagination, responseHandler } from "../../handlers/responseHandler";

import { getAllVaccineData, createVaccine, updateVaccineInfo, deleteVaccineInfo, getSingleVaccineData, createVaccineAllergies } from "./services";

export const getVaccineData = async (req: Request, res: Response) => {
  try {
    let query: any = req.query
    let queryset = { isDeleted: false }
    if (!query.id) {
      var { limit, offset } = await getPagination(query.page, query.size)
      const responseData = await getAllVaccineData(limit, offset, query.page, queryset)
      return responseHandler(res, httpStatus['OK'], true, responseData, null, "Data retrived successfully.", null)
    }
    else {
      const responseData = await getSingleVaccineData(query.id)

      return responseHandler(res, httpStatus['OK'], true, responseData, null, "Data retrived successfully.", null)
    }
  } catch (error) {
    responseHandler(res, httpStatus['BAD_REQUEST'], false, null, error, "Server issue.", null)
  }
}

export const createVaccineData = async (req: Request, res: Response) => {
  try {
    await createVaccine(req, res)
  }
  catch (error) {
    responseHandler(res, httpStatus['BAD_REQUEST'], false, null, error, "Server issue.", null)
  }

}

export const updateVaccineData = async (req: Request, res: Response) => {
  try {
    await updateVaccineInfo(req, res)
  }
  catch (error) {
    responseHandler(res, httpStatus['BAD_REQUEST'], false, null, error, "Server issue.", null)
  }

}

export const deleteVaccineData = async (req: Request, res: Response) => {
  try {
    await deleteVaccineInfo(req, res)
  }
  catch (error) {
    responseHandler(res, httpStatus['BAD_REQUEST'], false, null, error, "Server issue.", null)
  }

}


export const createVaccineAllergiesData = async (req: Request, res: Response) => {
  try {
    await createVaccineAllergies(req, res)
  }
  catch (error) {
    responseHandler(res, httpStatus['BAD_REQUEST'], false, null, error, "Server issue.", null)
  }

}