const { sendErrorResponse } = require("../../helpers/send_error_response");

async function selfGuard(req, res, next) {
  try {
    const idFromParams = parseInt(req.params.id);
    const idFromToken = req.user.id;

    if (idFromParams !== idFromToken) {
      return sendErrorResponse(
        { message: "Ruxsat etilmagan foydalanuvchi" },
        res,
        401
      );
    }

    next();
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
}

module.exports = selfGuard;
