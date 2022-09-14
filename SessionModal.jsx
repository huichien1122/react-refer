import React, { Component } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import Countdown from 'react-countdown';

class SessionModal extends Component{
  render() {
    
    const { t } = this.props;

    const renderer = ({ hours, minutes, seconds, completed }) => {
      return (
          <span className="session__cd">{minutes} {t('session.min')} {seconds} {t('session.sec')}</span>
      );
    };
    
    return (
      <>
        <Modal
          // visible={true}
          visible={this.props.visible}
          maskClosable={false}
          className="root__modal"
          closable={false}
          footer={null}
        >
          <Row>
            <Col span={24} className="left-item">
              <h2 className="title">{t('session.session_expiring')}</h2>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span className="desc">{t('session.session_desc')}</span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
            <Countdown 
              autoStart={true}
              date={this.props.nowTimeInt + this.props.timer}
              renderer={renderer}
              /> 
            </Col>
          </Row>
          <br />
          <Row>
            <Col  span={24} className="right-item">
              <Button className="black__btn" onClick={()=>this.props.leave()}>{t('session.leave')}</Button>&nbsp;&nbsp;
              <Button className="special__btn" onClick={()=>this.props.continue()}>{t('session.continue')}</Button>
            </Col>
          </Row>
        </Modal>
      </>
    )
  }
}

export default withRouter(withTranslation('common')(SessionModal));