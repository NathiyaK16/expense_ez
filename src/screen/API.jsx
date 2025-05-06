import { BASEPATH } from "./config"

LOGIN        = `${BASEPATH}v1/expensez/login/`
GETALLCLAIMS = `${BASEPATH}v1/client/ocr_inserts/get_all_claims/?emp_id=${emp_id}&company_id=${company_id}`
GETALLPOLICIES = `${BASEPATH}v1/client/policy/get_all_policies2/?operation=read&company_id=durr`
OCRBILLPOST      =  `${BASEPATH}v1/client/ocr_model_check/ocr_checks_creator/`
POSTNEWCLAIM    = `${BASEPATH}v1/client/ocr_inserts/ocr_inserting/`
APPROVALUPDATE = `${BASEPATH}v1/client/ocr_inserts/update_status_approval/`