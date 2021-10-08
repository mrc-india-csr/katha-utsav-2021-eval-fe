import React from "react"
import { connect } from 'react-redux';
import '../../styles/statusTile.scss';

const StatusTile = (props) =>{

  const totalCount = parseInt(props.pendingCount) + parseInt(props.approvedCount) + parseInt(props.declinedCount);

    return(
      <div>
        <span className="dashboardTitle"> Dashboard ({totalCount})</span>
        <br/><br/>
          <div className="gridContainer">
            <div className="tile">            
                <span className="statusCount">{props.pendingCount}</span><br/>
                <span className="statusSpan">PENDING</span>
              </div>
            <div className="tile">            
              <span className="statusCount">{props.approvedCount}</span><br/>
              <span className="statusSpan">APPROVED</span>
            </div>
          <div className="tile">            
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
    declinedCount:state.statusCount.declinedStatusCount
  }
};

export default connect(mapStateToProps) (StatusTile);