const MAX_BODY_BYTES = 64 * 1024;

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bytes = 0;
    req.on("data", (chunk) => {
      bytes += Buffer.byteLength(chunk);
      if (bytes > MAX_BODY_BYTES) {
        req.destroy();
        reject(new Error("Request body too large"));
        return;
      }
      body += chunk;
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function parseDateInput(value) {
  if (!value) {
    return new Date();
  }

  const isoCandidate = new Date(value);
  if (!Number.isNaN(isoCandidate.getTime())) {
    return isoCandidate;
  }

  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(`${year}-${month}-${day}T00:00:00`);
  }

  return new Date();
}

const FIELD_LIMITS = {
  receivedFrom: 500,
  companyRep: 500,
  companyRep2: 500,
  emailAddress: 254,
  sumOf: 500,
  sumOf2: 500,
  paymentFor: 1000,
  amountInvolved: 100,
};

function checkFieldLengths(body) {
  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    const val = body[field];
    if (typeof val === "string" && val.length > max) {
      return `${field} exceeds maximum length of ${max} characters.`;
    }
  }
  return null;
}

module.exports = {
  readJson,
  sendJson,
  normalizeText,
  parseDateInput,
  checkFieldLengths,
};
