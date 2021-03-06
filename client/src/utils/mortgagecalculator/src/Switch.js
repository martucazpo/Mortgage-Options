import Styles from "./Switch.css";
var React = require("react");

export default class Switch extends React.Component {
  render() {
    const styles = Styles;
    const { active } = this.props;
    var wrapperClass = styles.switchWrapper;
    if (active) {
      wrapperClass += " " + styles.switchWrapperActive;
    }
    return (
      <div
        className={wrapperClass}
        onClick={() => this.props.onChange(!active)}
      >
        <div className={styles.switchBubble}></div>
      </div>
    );
  }
}
