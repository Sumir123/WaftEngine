/**
 *
 * SettingsManagePage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

//@material components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
import { makeSelectSettings, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'settingsManagePage';

const styles = {};

export const SettingsManagePage = props => {
  const { loadAllSettingsRequest, settings, setValue } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadAllSettingsRequest();
  }, []);

  const [comment_status, setCommentStatus] = useState('');

  const handleDropDownChange = name => {
    const data = [...settings.data];
    setValue(data);
  };

  let setting_normalized = {};
  console.log(settings, 'settings');
  settings.data.reduce((acc, curr) => {
    return acc + curr;
  }, {});

  const commentStatus = ['posted', 'onhold', 'approved', 'disapproved'];
  const emailChannel = ['waft', 'smtp', 'mailgun', 'sendgri'];

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="comment-settings"
          id="comment-settings-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Comment Settings
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            {/* {settings.data.map((each, index) => (
        <div key={each._id} className="flex">
          <label>{each.title}</label>
          {typeof each.value === 'string' && <input value={each.value} />}
          {typeof each.value === 'boolean' && (
            <input type="checkbox" checked={each.value} />
          )}
        </div>
      ))} */}
            <div className="flex">
              <label className="label" htmlFor="grid-comment-status">
                Default status of comment
              </label>
              <select
                className="inputbox"
                native="true"
                value={comment_status}
                onChange={e => setCommentStatus(e.target.value)}
              >
                <option value="" disabled>
                  None
                </option>
                {commentStatus.map(each => (
                  <option name="name" value={each}>
                    {each}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    tabIndex={-1}
                    // onClick={this.handleCheckedChange('is_active')}
                    color="primary"
                  />
                }
                label="Recaptcha Check"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={false}
                    tabIndex={-1}
                    // onClick={this.handleCheckedChange('is_active')}
                    color="primary"
                  />
                }
                label="Is Login Required"
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="email-setting"
          id="email-setting-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Email Settings
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            <div className="flex justify-between">
              <div className="w-1/2">
                <label className="label" htmlFor="grid-email-channel">
                  Email Channel
                </label>
                <select
                  className="inputbox"
                  native="true"
                  value="waft"
                  // onChange={e => setCommentStatus(e.target.value)}
                >
                  <option value="" disabled>
                    None
                  </option>
                  {emailChannel.map(each => (
                    <option name="name" value={each}>
                      {each}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 ml-4">
                <label className="label" htmlFor="grid-email-to-send-mail">
                  Email to send test mail
                </label>
                <input
                  className="inputbox"
                  id="email-to-send-test-mail"
                  type="text"
                  value=""
                  name="email_to_send_test_mail"
                  // onChange={this.handleTempMetaKeyword}
                />
              </div>
            </div>
            <br />
            <div className="flex">
              <div className="w-1/2">
                <div>
                  <label className="label" htmlFor="grid-protocol">
                    Protocol
                  </label>
                  <input
                    className="inputbox"
                    id="protocol"
                    type="text"
                    value=""
                    name="protocol"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-email">
                    Email
                  </label>
                  <input
                    className="inputbox"
                    id="email"
                    type="text"
                    value=""
                    name="email"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-password">
                    Password
                  </label>
                  <input
                    className="inputbox"
                    id="password"
                    type="text"
                    value=""
                    name="password"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-server">
                    Server
                  </label>
                  <input
                    className="inputbox"
                    id="server"
                    type="text"
                    value=""
                    name="server"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-port">
                    Port
                  </label>
                  <input
                    className="inputbox"
                    id="port"
                    type="text"
                    value=""
                    name="port"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-security">
                    Security
                  </label>
                  <input
                    className="inputbox"
                    id="security"
                    type="text"
                    value=""
                    name="security"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
                <br />
                <div>
                  <label className="label" htmlFor="grid-password">
                    Secure
                  </label>
                  <select
                    className="inputbox"
                    native="true"
                    value={true}
                    // onChange={e => setCommentStatus(e.target.value)}
                  >
                    <option name="secure" value={true}>
                      True
                    </option>
                    <option name="secure" value={false}>
                      False
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-1/2 ml-4">
                <div>
                  <label className="label" htmlFor="grid-api-key">
                    Api Key
                  </label>
                  <input
                    className="inputbox"
                    id="api-key"
                    type="text"
                    value=""
                    name="api_key"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="grid-domain">
                    Domain
                  </label>
                  <input
                    className="inputbox"
                    id="domain"
                    type="text"
                    value=""
                    name="domain"
                    // onChange={this.handleTempMetaKeyword}
                  />
                </div>
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="login-settings"
          id="login-settings-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Register and login Settings
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    tabIndex={-1}
                    // onClick={this.handleCheckedChange('is_active')}
                    color="primary"
                  />
                }
                label="Is Public Registration"
              />
            </div>
            <div className="flex">
              <label className="label" htmlFor="grid-secret-key">
                Secret Key
              </label>
              <input
                className="inputbox"
                id="secret-key"
                type="text"
                value=""
                name="secret_key"
                // onChange={this.handleTempMetaKeyword}
              />
            </div>
            <br />
            <div className="flex">
              <label className="label" htmlFor="grid-token-expire-time">
                Token Expire Time
              </label>
              <input
                className="inputbox"
                id="token-expire-time"
                type="text"
                value=""
                name="token_expire_time"
                // onChange={this.handleTempMetaKeyword}
              />
            </div>
            <br />
            <div className="flex justify-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    tabIndex={-1}
                    // onClick={this.handleCheckedChange('is_active')}
                    color="primary"
                  />
                }
                label="Allow Google Login"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    tabIndex={-1}
                    // onClick={this.handleCheckedChange('is_active')}
                    color="primary"
                  />
                }
                label="Allow Facebook Login"
              />
            </div>
            <div className="flex justify-between">
              <div className="w-1/2">
                <label className="label" htmlFor="grid-client-id">
                  Client Id
                </label>
                <input
                  className="inputbox"
                  id="client-id"
                  type="text"
                  value=""
                  name="client_id"
                  // onChange={this.handleTempMetaKeyword}
                />
              </div>
              <div className="w-1/2 ml-4">
                <label className="label" htmlFor="grid-app-id">
                  App Id
                </label>
                <input
                  className="inputbox"
                  id="app-id"
                  type="text"
                  value=""
                  name="app_id"
                  // onChange={this.handleTempMetaKeyword}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/2">
                <label className="label" htmlFor="grid-client-secret">
                  Client Secret
                </label>
                <input
                  className="inputbox"
                  id="client-id"
                  type="text"
                  value=""
                  name="client_id"
                  // onChange={this.handleTempMetaKeyword}
                />
              </div>
              <div className="w-1/2 ml-4">
                <label className="label" htmlFor="grid-app-id">
                  App Secret
                </label>
                <input
                  className="inputbox"
                  id="app-id"
                  type="text"
                  value=""
                  name="app_id"
                  // onChange={this.handleTempMetaKeyword}
                />
              </div>
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="captcha-keys"
          id="captcha-keys-header"
        >
          <h3 className="border-b text-xl font-bold border-gray-300 pb-2">
            Captcha Keys
          </h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="bg-white rounded p-4 shadow">
            <div className="flex">
              <label className="label" htmlFor="grid-email-channel">
                Secret Key
              </label>
              <input
                className="inputbox"
                id="secret-key"
                type="text"
                value=""
                name="secret_key"
                // onChange={this.handleTempMetaKeyword}
              />
            </div>
            <br />
            <div className="flex">
              <label className="label" htmlFor="grid-email-to-send-mail">
                Site Key
              </label>
              <input
                className="inputbox"
                id="site-key"
                type="text"
                value=""
                name="site_key"
                // onChange={this.handleTempMetaKeyword}
              />
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <button
        className="py-2 px-6 rounded mt-4 text-sm text-white bg-primary uppercase btn-theme justify-center"
        // onClick={this.handleSave}
      >
        Save
      </button>
    </>
  );
};

SettingsManagePage.propTypes = {
  loadAllSettingsRequest: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(SettingsManagePage);
