import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const AuthError = (props) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count === 0) {
        clearInterval(timer);
        window.location.reload();
      } else {
        setCount((prevCount) => prevCount - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div className="error">
      {props.authError}
      <h1>Перезагрузка через: {count} сек.</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
});

export default connect(mapStateToProps, null)(AuthError);
