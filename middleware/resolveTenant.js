const Tenant = require("../models/tenantModel");

const resolveTenant = async (req, res, next) => {
    try {
        const hostname = req.hostname;

    const domainParts = hostname.split(".")

    if (domainParts.length < 3) { //checking if there is a subdomain or not; 2 pieces = no subdomain; 3 or more = subdomain
        return res.status(400).json({
            error: { message: "No location specified." },
            statusCode: 400
        });
    } else {
        const subdomain = domainParts[0].toLowerCase();

        const result = await Tenant.findOne({"subdomainSlug": subdomain})

        // checking if that document's activeStatus field is anything other than "active" OR if the result is null - the tenant wasn't found at all
        if (result === null || result.activeStatus !== "active") {
          return res.status(404).json({
            error: { message: "No active tenant found." },
            statusCode: 404,
          });
        } else {
            req.tenant = result;

            next(); //done, move on to whatever is next
        }
    }

    } catch (error) {
        return next(error);
    }
}

module.exports = resolveTenant;