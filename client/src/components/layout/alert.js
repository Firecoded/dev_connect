import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts, theme }) => {
    return alerts.map((alert) => (
        <div key={alert.id} className={`alert ${theme[alert.alertType]}`}>
            {alert.msg}
        </div>
    ));
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ alerts: state.alert, theme: state.theme });

export default connect(mapStateToProps)(Alert);
