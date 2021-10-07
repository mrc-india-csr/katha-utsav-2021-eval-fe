import config from '../config'

const {pgDatabaseSchema} = config

export const loginQuery = `select * from ${pgDatabaseSchema}.juries where jury_email_id = $1`;

export const fetchStudentDetailsQueryBuilder = (conditionObject, userData, count=false) => {
  const {dataSet, assignedOnly, storyFilter, statusFilter} = conditionObject;
  const {email} = userData;
  const limit = 100;

  const showUnAssigned = assignedOnly ? `AND studentDetails.jury_email_id='${email}'` : '';
  const storyFilterCondition = storyFilter === 'All' ? '' : `AND studentDetails.story_category_name='${storyFilter}'`;
  const useLimit = count ? '' : `limit ${limit}`;
  const offsetValue = count ? '0' : (parseInt(dataSet)-1) * limit;
  let statusFilterCondition = '';

  if(statusFilter === 'APPROVED' || statusFilter === 'REJECTED') {
    statusFilterCondition = `AND studentDetails.evaluation_status='${statusFilter}'`;
  } else {
    statusFilterCondition = `AND (studentDetails.evaluation_status='IN REVIEW' OR studentDetails.evaluation_id is NULL)`;
  }

  return `select * from (
          select student.student_id, student.student_name, class.class_name, story.story_category_name, student.file_location_url, payment.payment_status, jury.jury_email_id, jury.jury_name ,evaluation.evaluation_status, student.evaluation_id
          from ${pgDatabaseSchema}.students student
          inner join ${pgDatabaseSchema}.classes class on student.class_id=class.class_id
          inner join ${pgDatabaseSchema}.story_categories story on student.story_category_id=story.story_category_id
          left join ${pgDatabaseSchema}.payments payment on student.student_id=payment.student_id
          left join ${pgDatabaseSchema}.evaluations evaluation on student.evaluation_id=evaluation.evaluation_id
          left join ${pgDatabaseSchema}.juries jury on evaluation.jury_id=jury.jury_id
          ) as studentDetails where studentDetails.payment_status='SUCCESS' ${showUnAssigned} ${storyFilterCondition} ${statusFilterCondition} order by studentDetails.student_id ${useLimit} offset ${offsetValue}`;
}

export const countStudentDetailsQueryBuilder = (conditionObject, userData) => {
  const builtQuery = fetchStudentDetailsQueryBuilder(conditionObject, userData, true);
  return `select count (*) from(${builtQuery}) as formattedStudentDetails`;
}

export const countFictionStudentDetailsQueryBuilder = (conditionObject, userData) => {
  const updatedConditionObject = {
    ...conditionObject,
    storyFilter: 'Fiction'
  }
  const builtQuery = fetchStudentDetailsQueryBuilder(updatedConditionObject, userData, true);
  return `select count (*) from(${builtQuery}) as formattedStudentDetails`;
}

export const countNonFictionStudentDetailsQueryBuilder = (conditionObject, userData) => {
  const updatedConditionObject = {
    ...conditionObject,
    storyFilter: 'Non-Fiction'
  }
  const builtQuery = fetchStudentDetailsQueryBuilder(updatedConditionObject, userData, true);
  return `select count (*) from(${builtQuery}) as formattedStudentDetails`;
}

export const countPoetryStudentDetailsQueryBuilder = (conditionObject, userData) => {
  const updatedConditionObject = {
    ...conditionObject,
    storyFilter: 'Poetry'
  }
  const builtQuery = fetchStudentDetailsQueryBuilder(updatedConditionObject, userData, true);
  return `select count (*) from(${builtQuery}) as formattedStudentDetails`;
}

export const pendingStatusCountQuery = `select count(*) from (
                                        select student.student_id, payment.payment_status, evaluation.evaluation_id, evaluation.evaluation_status 
                                        from ${pgDatabaseSchema}.students student 
                                        inner join ${pgDatabaseSchema}.payments payment on student.student_id = payment.student_id 
                                        left join ${pgDatabaseSchema}.evaluations evaluation on student.student_id = evaluation.student_id
                                        ) as status_details where status_details.payment_status = 'SUCCESS' and (status_details.evaluation_id is null or status_details.evaluation_status='IN REVIEW');`;
export const evaluationStatusCountQuery = `select count(*) from (
                                        select student.student_id, payment.payment_status, evaluation.evaluation_id, evaluation.evaluation_status 
                                        from ${pgDatabaseSchema}.students student 
                                        inner join ${pgDatabaseSchema}.payments payment on student.student_id = payment.student_id 
                                        left join ${pgDatabaseSchema}.evaluations evaluation on student.student_id = evaluation.student_id
                                        ) as status_details where status_details.payment_status = 'SUCCESS' and status_details.evaluation_status = $1;`;

export const assignedCheckWithEvaluation = `select exists(select * from ${pgDatabaseSchema}.evaluations where student_id=$1)`;
export const assignedCheckWithStudents = `select evaluation_id from ${pgDatabaseSchema}.students where student_id=$1`;
export const unassignCheck = `select * from ${pgDatabaseSchema}.students students
join ${pgDatabaseSchema}.evaluations evaluations on students.evaluation_id = evaluations.evaluation_id where students.student_id=$1`;

export const assignNewEvaluation = `insert into ${pgDatabaseSchema}.evaluations (student_id, jury_id, evaluation_status) values ($1, $2, 'IN REVIEW') returning evaluation_id`;
export const studentSetEvaluationId = `update ${pgDatabaseSchema}.students set evaluation_id=$1 where student_id=$2`;
export const deleteEvaluation = `delete from ${pgDatabaseSchema}.evaluations evaluations where evaluations.evaluation_id=$1`;