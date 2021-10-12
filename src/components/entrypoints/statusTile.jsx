import React, {useState} from "react"
import { connect } from 'react-redux';
import '../../styles/statusTile.scss';
import { useDispatch } from 'react-redux';
import {getStudentDetails, statusFilter, updateCurrentDataset} from '../../client/actions/creators';

const StatusTile = (props) => {

    const dispatch = useDispatch();
    const totalCount = parseInt(props.pendingCount) + parseInt(props.approvedCount) + parseInt(props.declinedCount);
    const [tileState, setTileState] = useState(1);

    const showApproved = () => {
        if(tileState!=2) {
            dispatch(updateCurrentDataset(1));
            dispatch(statusFilter('APPROVED'));
            dispatch(getStudentDetails());
            setTileState(2);
            props.clickAction(props.approvedCount);
        }
    };

    const showDeclined = () => {
        if(tileState!=3) {
            dispatch(updateCurrentDataset(1));
            dispatch(statusFilter('DECLINED'));
            dispatch(getStudentDetails());
            setTileState(3);
            props.clickAction(props.declinedCount);
        }
    };

    const showPending = () => {
        if(tileState!=1) {
            dispatch(statusFilter('PENDING'));
            dispatch(getStudentDetails());
            setTileState(1);
            props.clickAction(props.pendingCount);
        }
    };

    return(
      <div>
        <span className="dashboardTitle"> Dashboard ({totalCount})</span>
        <br/><br/>
          <div className="gridContainer">
              <div className={`tile ${tileState === 1 && 'purple'}`} onClick={() => showPending()}>
                  <span className="statusCount">{props.pendingCount}</span><br/>
                  <span className="statusSpan">PENDING</span>
              </div>

              <div className={`tile ${tileState === 2 && 'purple'}`} onClick={() => showApproved()}>
                  <span className="statusCount">{props.approvedCount}</span><br/>
                  <span className="statusSpan">APPROVED</span>
              </div>
              <div className={`tile ${tileState === 3 && 'purple'}`} onClick={() => showDeclined()}>
                  <span className="statusCount">{props.declinedCount}</span><br/>
                  <span className="statusSpan">DECLINED</span>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => {
  return {
    pendingCount: state.statusCount.pendingStatusCount,
    approvedCount: state.statusCount.approvedStatusCount,
    declinedCount:state.statusCount.declinedStatusCount,
  }
};

export default connect(mapStateToProps) (StatusTile);