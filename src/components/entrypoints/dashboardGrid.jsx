import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import {
    acceptOrDeclineStory,
    assignStory,
    unAssignStory,
    getStudentDetails,
    filterMine
} from '../../client/actions/creators';
import '../../styles/dashboard-grid.scss';
import download from '../../client/assets/download.png';
import toggleOn from '../../client/assets/toggle-on.png';
import toggleOff from '../../client/assets/toggle-off.png';

const DashboardGrid = (props) => {
    // console.log(props);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const storyActionHandler = (student_id, storyCategory, action, studentIndex) => {
        const category = storyCategory.replace(/[^a-zA-Z]/g,"");
        dispatch(acceptOrDeclineStory({
            id: student_id,
            storyAction: action,
            storyCategory: category,
            studentIndex
        }));
    };

    const assignStoryHandler = (student_id, studentIndex) => {
        console.log('Assign handler clicked');
        dispatch(assignStory({
            id: student_id,
            studentIndex
        }));
    };

    const unAssignStoryHandler = (student_id, studentIndex) => {
        console.log('unAssign handler clicked');
        dispatch(unAssignStory({
            id: student_id,
            studentIndex
        }));
    };

    const toggleFilterMine = (toggle) => {
        console.log('filter my stories');
        dispatch(filterMine(!toggle));
        dispatch(getStudentDetails());
        setToggle(!toggle);
    };

    return (
        <div className='dashboard-grid'>
            <div className='dashboard-grid__filters'>
                <div>Filters</div>
                <button>{`All(${props.totalCount || 0})`}</button>
                <button>{`Fiction(${props.fictionCount || 0})`}</button>
                <button>{`Non Fiction(${props.NonFictionCount || 0})`}</button>
                <button>{`Poetry(${props.poetryCount || 0})`}</button>
                <button onClick={() => toggleFilterMine(toggle)} className='dashboard-grid__filters--filter'>Show only Assigned to me <img src={toggle ? toggleOn: toggleOff} alt="toggle" /></button>
            </div>
            <table>
                <tr className='dashboard-grid__header'>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Story Category</th>
                    <th>File</th>
                    <th>Status</th>
                    <th className='dashboard-grid__header--assign'>Assigned To</th>
                </tr>
                {props.studentsList.map((obj, index) => {
                    return (<tr className='dashboard-grid__body'>
                        <td>{obj.student_name}</td>
                        <td>{obj.class_name}</td>
                        <td>{obj.story_category_name}</td>
                        <td><img src={download} alt="" /><a href={obj.file_location_url}>Download File</a></td>
                        <td>{obj.evaluation_status || 'Pending'}</td>
                        <td>{obj.jury_name || '--'}</td>
                        {(obj.jury_email_id === null || obj.jury_email_id === props.juryEmailId) && <td> {obj.evaluation_status === 'IN REVIEW' 
                        ? <div className='cta-wrapper'>
                            <button className='approve-cta' onClick={() => storyActionHandler(obj.student_id, obj.story_category_name, 1, index)}>Approve</button>
                            <button className='decline-cta' onClick={() => storyActionHandler(obj.student_id, obj.story_category_name, 2, index)}>Decline</button>
                            <button className='unassign-cta' onClick={() => unAssignStoryHandler(obj.student_id, index)}>Un-Assign</button></div> 
                        : <button className='assign-to-me-cta' onClick={() => assignStoryHandler(obj.student_id, index)}>Assign to me</button>}</td>}
                    </tr>);
                })}
                {/*<div></div>*/}
            </table>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        dataSet: state.studentDetails.dataSet,
        assignedOnly: state.studentDetails.assignedOnly,
        storyFilter: state.studentDetails.storyFilter,
        limit: state.studentDetails.limit,
        statusFilter: state.studentDetails.statusFilter,
        totalCount: state.studentDetails.totalCount,
        currentPage: state.studentDetails.currentPage,
        totalPages: state.studentDetails.totalPages,
        prevEnabled: state.studentDetails.prevEnabled,
        nextEnabled: state.studentDetails.nextEnabled,
        fictionCount: state.studentDetails.fictionCount,
        NonFictionCount: state.studentDetails.NonFictionCount,
        poetryCount: state.studentDetails.poetryCount,
        currentDataSet: state.studentDetails.currentDataSet,
        totalDataSet: state.studentDetails.totalDataSet,
        studentsList: state.studentDetails.studentsList,
        juryEmailId: state.statusCount.juryEmailId
    }
};

export default connect(mapStateToProps) (DashboardGrid);