const Type = require("../../../db/type");
async function getTypes(req) {
  try {
    const types = await Type.find({}).lean();
    if (!types.length) return { status: 404, message: "not found", data: [] };
    return { status: 200, message: "ok", data: [...types] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
module.exports = { getTypes };
