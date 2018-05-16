import C from '../constants/jobs';
import { database } from '../firebaseApp';

const jobsRef = database.ref('jobs');

export const listenToJobs = () => dispatch =>
  jobsRef.on(
    'value',
    snapshot =>
      dispatch({
        type: C.JOBS_RECEIVE_DATA,
        data: snapshot.val(),
      }),
    error =>
      dispatch({
        type: C.JOBS_RECEIVE_DATA_ERROR,
        message: error.message,
      }),
  );

export const submitJob = content => (dispatch, getState) => {
  const state = getState();
  const job = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.JOB_AWAIT_CREATION_RESPONSE });
  jobsRef.push(job, (error) => {
    dispatch({ type: C.JOB_RECEIVE_CREATION_RESPONSE });
    if (error) {
      dispatch({
        type: C.FEEDBACK_DISPLAY_ERROR,
        error: `Job submission failed! ${error}`,
      });
    } else {
      dispatch({
        type: C.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully saved!',
      });
    }
  });
};

export const startJobEdit = qid => dispatch =>
  dispatch({ type: C.JOB_EDIT, qid });

export const cancelJobEdit = qid => dispatch =>
  dispatch({ type: C.JOB_EDIT_FINISH, qid });

export const submitJobEdit = (qid, content) => (dispatch, getState) => {
  const state = getState();
  const job = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.JOB_EDIT_SUBMIT, qid });
  jobsRef.child(qid).set(job, (error) => {
    dispatch({ type: C.JOB_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C.FEEDBACK_DISPLAY_ERROR,
        error: `Job update failed! ${error}`,
      });
    } else {
      dispatch({
        type: C.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully updated!',
      });
    }
  });
};

export const deleteJob = qid => (dispatch) => {
  dispatch({ type: C.JOB_EDIT_SUBMIT, qid });
  jobsRef.child(qid).remove((error) => {
    dispatch({ type: C.JOB_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C.FEEDBACK_DISPLAY_ERROR,
        error: `Job deletion failed! ${error}`,
      });
    } else {
      dispatch({
        type: C.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully deleted!',
      });
    }
  });
};
