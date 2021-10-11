import React, {useState} from 'react';
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "./loader";
import { toast } from 'react-toastify';
import { acceptOrDeclineStory } from '../client/actions/creators';

export const ConfirmationDialog = () => {
  const [loading, setLoading] = useState(false);
  const {showModal, displayName, evaluationParams} = useSelector(state => state.displayModalReducer);
  const dispatch = useDispatch();
  const approveText = evaluationParams.storyAction === 1 ? 'Approve' : '';
  const declineText = evaluationParams.storyAction === 2 ? 'Decline' : '';

  const confirmAction = () => {
    if (loading) return;
    dispatch(acceptOrDeclineStory(evaluationParams));
    setLoading(true);
    setTimeout(() => {
      dispatch({type: 'hide_modal'});
      setLoading(false);
      toast.success("Action Performed Successfully !")
    }, 3000);
  }

  const closeDialog = () => {
    if (loading) return;
    dispatch({type: 'hide_modal'})
  }

  return ReactDOM.createPortal(
    showModal ? <div className={'confirmation-modal'}>
      <div className={'modal-container'}>
        <p>Are you sure want to <span className={'approve-text'}>{approveText}</span> <span className={'decline-text'}>{declineText}</span> the Story by {displayName}</p>
        <div className={'button-section'}>
          <button className={'confirm-button'} onClick={confirmAction}>{loading ? <Loader /> : 'Yes'}</button>
          <button className={'close-button'} onClick={closeDialog}>No</button>
        </div>
      </div>
    </div> : null,
    document.getElementById('modal')
  )
}