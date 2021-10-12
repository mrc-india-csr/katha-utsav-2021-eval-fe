import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import {
    acceptOrDeclineStory,
    assignStory,
    unAssignStory,
    getStudentDetails,
    filterMine,
    showModal,
    updateCurrentDataset
} from '../../client/actions/creators';
import '../../styles/dashboard-grid.scss';
import download from '../../client/assets/download.png';
import toggleOn from '../../client/assets/toggle-on.png';
import toggleOff from '../../client/assets/toggle-off.png';

const DashboardGrid = (props) => {
    // console.log(props);
    const [toggle, setToggle] = useState(false);
    let [paginationDetails, setPaginationDetails] = useState({limit: 10, index: 0, datasetIndex: 1});
    const dispatch = useDispatch();
    const storyActionHandler = (student_id, storyCategory, action, studentIndex, displayName) => {
        const category = storyCategory.replace(/[^a-zA-Z]/g,""); 
        const evaluationParams = {
            id: student_id,
            storyAction: action,
            storyCategory: category,
            studentIndex
        }
        const data = {
            evaluationParams,
            displayName
        }
        dispatch(showModal(data));
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

    const fetchNextDataSet = () => {

    };

    const prevStep = () => {
        paginationDetails.index!=0 && setPaginationDetails({...paginationDetails, index: --paginationDetails.index});
    };

    const nextStep = () => {
        if(paginationDetails.limit*(paginationDetails.index+1) < 100) {
            setPaginationDetails({...paginationDetails, index: ++paginationDetails.index});
        }
        else if (paginationDetails.limit*(paginationDetails.index+1) >= 100 && paginationDetails.datasetIndex < props.totalDataSet) {
            dispatch(updateCurrentDataset(props.currentDataSet+1));
            dispatch(getStudentDetails());

        }
    };

    const studentArray = props.studentsList.slice(paginationDetails.limit*paginationDetails.index, paginationDetails.limit*(paginationDetails.index+1));

    return (
        <div className='dashboard-grid'>
            <div className='dashboard-grid__filters'>
                <div>Filters</div>
                <button className = {'dashboard-grid__filters' + (props.storyFilter === 'All' ? '--selected' : '--default')} onClick={() => props.getUpdatedStories("All")}>{`All - ${props.totalCount || 0}`}</button>
                <button className = {'dashboard-grid__filters' + (props.storyFilter === 'Fiction' ? '--selected' : '--default')} onClick={() => props.getUpdatedStories("Fiction")}>{`Fiction - ${props.fictionCount || 0}`}</button>
                <button className = {'dashboard-grid__filters' + (props.storyFilter === 'Non-Fiction' ? '--selected' : '--default')} onClick={() => props.getUpdatedStories("Non-Fiction")}>{`Non Fiction - ${props.NonFictionCount || 0}`}</button>
                <button className = {'dashboard-grid__filters' + (props.storyFilter === 'Poetry' ? '--selected' : '--default')} onClick={() => props.getUpdatedStories('Poetry')}>{`Poetry - ${props.poetryCount || 0}`}</button>
                <button onClick={() => toggleFilterMine(toggle)} className='dashboard-grid__filters--filter'>Show only Assigned to me <img src={toggle ? toggleOn: toggleOff} alt="toggle" /></button>
            </div>
            <table>
                <tr className='dashboard-grid__header'>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Story Category</th>
                    <th>File</th>
                    <th>Status</th>
                    {props.statusFilter === 'PENDING' && <th className='dashboard-grid__header--assign'>Assigned To</th>}
                </tr>
                {studentArray.length && studentArray.map((obj, index) => {
                    return (<tr className='dashboard-grid__body'>
                        <td>{obj.student_name}</td>
                        <td>{obj.class_name}</td>
                        <td>{obj.story_category_name}</td>
                        <td><img src={download} alt="" /><a href={obj.file_location_url}>Download File</a></td>
                        <td>{obj.evaluation_status || 'Pending'}</td>
                        {props.statusFilter === 'PENDING' && <td>{obj.jury_name || '--'}</td>}
                        {props.statusFilter === 'PENDING' && (obj.jury_email_id === null || obj.jury_email_id === props.juryEmailId) && <td> {obj.evaluation_status === 'IN REVIEW'
                        ? <div className='cta-wrapper'>
                            <button className='approve-cta' onClick={() => storyActionHandler(obj.student_id, obj.story_category_name, 1, index, obj.student_name)}>Approve</button>
                            <button className='decline-cta' onClick={() => storyActionHandler(obj.student_id, obj.story_category_name, 2, index, obj.student_name)}>Decline</button>
                            <button className='unassign-cta' onClick={() => unAssignStoryHandler(obj.student_id, index)}>Un-Assign</button></div>
                        : <button className='assign-to-me-cta' onClick={() => assignStoryHandler(obj.student_id, index)}>Assign to me</button>}</td>}
                    </tr>);
                })}
                <div className='dashboard-grid__page-details'>
                    <div>{`${paginationDetails.index+1} of ${Math.ceil(props.totalCount/paginationDetails.limit) || 1}`}</div>
                    <button onClick={() => prevStep()}>{`<`}</button>
                    <button onClick={() => nextStep()}>{`>`}</button>
                    <div>Total List Items - {props.totalCount}</div>
                </div>
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

const mapDispatchToProps = dispatch => {
    return{
        getUpdatedStories : (storyType) => dispatch(getStudentDetails(storyType))
    }  
}

export default connect(mapStateToProps,mapDispatchToProps) (DashboardGrid);