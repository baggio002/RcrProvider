/**
 * Schema:
 * case_number, ldap, status, owner_shard, specialization, age, last_message_age
 */
function getRcrCases(site, shard) {
  return convertToJson_(getRcrCasesRaw(site, getRcrSheetName_(shard)));
}

function getRcrCasesRaw(site, shard) {
  /** 
  return Utils.getRemoteValueWithNonLastRowRange(RCR_SOURCE_SHEET_ID, getRcrSheetName_(shard), RCR_SHEET_RANGE).filter(
    function (element) {
      return !Utils.isNull(element[0]);
    }
  );
  */
  return [];
}

function getRcrSheetName_(shard) {
  if (RCR_SHEETS_NAME_MAP.has(shard)) {
    return RCR_SHEETS_NAME_MAP.get(shard);
  } else {
    return shard;
  }
}
																																				
function convertToJson_(raws) {
  let cases = [];
  raws.forEach(
    raw => {
      let caseObj = {};
      caseObj.case_number = raw[0].toString();
      caseObj.ldap = raw[1];
      caseObj.status = raw[2];
      caseObj.owner_shard = raw[3];
      caseObj.specialization = raw[4];
      caseObj.case_age = raw[5];
      caseObj.last_message_age = raw[6];
      cases.push(caseObj);
    }
  );
  return cases;
}

function getRcrCasesWithNormalCasesFormat(site, shard) {
  let cases = getRcrCases(site, shard);
  let schema = CasesProvider.getSchema(site, shard);
  let formatCases = [];
  cases.forEach(
    caseObj => {
      let json = Utils.getFormatJson(schema);
      json.case_number = caseObj.case_number;
      json.ldap = caseObj.ldap;
      json.case_status_shortened = caseObj.status;
      json.owner_shard = caseObj.owner_shard;
      json.case_age = caseObj.case_age;
      json.specialization = caseObj.specialization;
      formatCases.push(json);
    }
  );
  return formatCases;
}

function test() {
  Logger.log(getRcrCasesRaw('', 'Data'));
}
