import React from 'react';
import PropTypes from 'prop-types';
import { CustomModal } from './styles';
import { Spinner } from 'react-bootstrap';

const Loading = ({ loadingState }) => {
  return (
    <CustomModal
      show={loadingState}
      onHide={() => {}}
      centered
      aria-labelledby="contained-modal-title-vcenter">
      <div>
        <Spinner
          animation={'border'}
          style={{
            border: `.35em solid #CFCFCF`,
            borderRightColor: 'transparent',
            width: '3rem',
            height: '3rem',
            animationDuration: '1.5s',
          }}
        />
      </div>
    </CustomModal>
  );
};

Loading.propTypes = {
  loadingState: PropTypes.bool,
};

export default Loading;
