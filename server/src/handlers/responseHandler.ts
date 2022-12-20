interface IResponse {
  success: boolean;
  data: any,
  error: any,
  message: string,
  token: {} | string,
}


export const responseHandler = (res: any, status: any, success: any, data: any, error: any, message: any, token: any) => {
  let response: IResponse = {
    success,
    data,
    error,
    message,
    token
  };
  if (success !== null) response.success = success;
  if (data !== null) response.data = data;
  if (error !== null) response.error = error;
  if (message !== null) response.message = message;
  if (token !== null) response.token = token;
  return res.status(status).json(response);
}



export const getPagingData = async (items: any, page: number, limit: number) => {
  const { count: totalItems, rows: item } = items;
  const data = items.rows
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { data, totalPages, currentPage };
};


export const getPagination = async (page: number, size: number) => {
  const limit = size ? +size : 25;
  var offset;
  if (!page || page <= 1) {
    offset = 0;
  }
  else {
    offset = (page - 1) * limit
  }
  return { limit, offset };
};


export const getAllQuery = (query: any) => {
  var data = [];
  for (var param in query) {
    if (query[param]) {
      data.push([param, query[param]]);
    }
  }
  return Object.fromEntries(data);
}