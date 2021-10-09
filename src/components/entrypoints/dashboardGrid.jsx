import React from 'react';
import { connect } from 'react-redux';
import '../../styles/dashboard-grid.scss';

const DashboardGrid = (props) => {
    // console.log(props);
    return (
        <div className='dashboard-grid'>
            <div className='dashboard-grid__filters'>
                <div>Filters</div>
                <button>All(212)</button>
                <button>Fiction(212)</button>
                <button>Non Fiction(212)</button>
                <button>Poetry(212)</button>
                <button>Filter</button>
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
                {props.studentsList.map((obj) => {
                    console.log(obj);
                    return (<tr className='dashboard-grid__body'>
                        <td>{obj.student_name}</td>
                        <td>{obj.class_name}</td>
                        <td>{obj.story_category_name}</td>
                        <td><a href={obj.file_location_url}>Download File</a></td>
                        <td>{obj.evaluation_status || 'Pending'}</td>
                        <td>{obj.jury_name || '--'}</td>
                    </tr>);
                })}
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
    }
};

export default connect(mapStateToProps) (DashboardGrid);