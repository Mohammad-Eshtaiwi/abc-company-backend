const Status = require("../../../db/status");
async function getStatuses(req) {
  try {
    const statuses = await Status.find({}).lean();
    if (!statuses.length) return { status: 404, message: "not found", data: [] };
    return { status: 200, message: "ok", data: [...statuses] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
module.exports = { getStatuses };
