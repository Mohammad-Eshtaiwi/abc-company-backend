const Priority = require("../../../db/priority");
async function getPriorities(req) {
  try {
    const priorities = await Priority.find({}).lean();
    if (!priorities.length) return { status: 404, message: "not found", data: [] };
    return { status: 200, message: "ok", data: [...priorities] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
module.exports = { getPriorities };
