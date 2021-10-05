import config from '../config'

const {pgDatabaseSchema} = config

export const loginQuery = `select * from ${pgDatabaseSchema}.juries where jury_email_id = $1`;

export const fetchStudentDetailsQueryBuilder = (conditionObject, userData, count=false) => {
  const {page, assignedOnly, filter, limit} = conditionObject;
  const {email} = userData;

  const showUnAssigned = assignedOnly ? '' : 'OR studentDetails.jury_email_id is null';
  const filterCondition = filter === 'All' ? '' : `AND studentDetails.story_category_name='${filter}'`;
  const useLimit = count ? '' : `limit ${limit}`;
  const offsetValue = count ? '0' : (parseInt(page)-1) * limit;

  return `select * from (
          select student.student_id, student.student_name, class.class_name, story.story_category_name, student.file_location_url, payment.payment_status, jury.jury_email_id, jury.jury_name ,evaluation.evaluation_status
          from ${pgDatabaseSchema}.students student
          inner join ${pgDatabaseSchema}.classes class on student.class_id=class.class_id
          inner join ${pgDatabaseSchema}.story_categories story on student.story_category_id=story.story_category_id
          left join ${pgDatabaseSchema}.payments payment on student.student_id=payment.student_id
          left join ${pgDatabaseSchema}.evaluations evaluation on student.evaluation_id=evaluation.evaluation_id
          left join ${pgDatabaseSchema}.juries jury on evaluation.jury_id=jury.jury_id
          ) as studentDetails where studentDetails.payment_status='SUCCESS' AND (studentDetails.jury_email_id='${email}' ${showUnAssigned}) ${filterCondition} order by studentDetails.student_id ${useLimit} offset ${offsetValue}`;
}

export const countStudentDetailsQueryBuilder = (conditionObject, userData) => {
  const builtQuery = fetchStudentDetailsQueryBuilder(conditionObject, userData, true);

  return `select count (*) from(${builtQuery}) as formattedStudentDetails`;
}