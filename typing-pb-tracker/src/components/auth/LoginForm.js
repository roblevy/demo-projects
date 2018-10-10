import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, credentials }) => {
  return (
    <section className="section">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={credentials.email}
            className="input"
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={credentials.password}
            className="input"
          />
        </div>
        <button className="button is-primary">Login</button>
      </form>
    </section>
  );
};

export default LoginForm;
