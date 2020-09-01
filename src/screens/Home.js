import React, { useEffect, useState, useContext, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import CompanyService from "../services/companyService";
import { GlobalContext } from "../utility/GlobalContext";
import CompanyOverview from "../containers/Home/CompanyOverview";
import LandingPage from "./LandingPage";

export default function Home() {
  const { state, setState } = useContext(GlobalContext);
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useRef();
  const checkBtn = useRef();

  const fetchCompany = (jwt) => {
    setMessage("");
    setLoading(true);
    CompanyService.fetch(jwt)
      .then((response) => {
        setCompany(response.data.company);
        setLoading(false);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      });
  };

  useEffect(() => {
    // console.log("COmpany!", company);
    fetchCompany(state.jwt);
    return () => {
      // console.log("cleanup!");
    };
  }, [state]);

  const createCompany = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      CompanyService.create(companyName, state.jwt)
        .then((response) => {
          fetchCompany(state.jwt);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        });
    } else {
      setLoading(false);
    }
  };

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const onChangeCompanyName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
  };

  // if (loading || state.loading) {
  //   return (
  //     <div>
  //       <h1>Loading</h1>
  //     </div>
  //   );
  // }
  if (!state.jwt) {
    return <LandingPage />;
  }
  return (
    <div>
      {company ? (
        <CompanyOverview company={company} jwt={state.jwt} />
      ) : (
        <div>
          <h4>You are not in a company</h4>
          <h4>Options:</h4>
          <h4>Give your email address to team owner and they will add you</h4>
          <hr></hr>
          <h4>Create a team</h4>
          <Form onSubmit={createCompany} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Company Name</label>
              <Input
                type="text"
                className="form-control"
                name="companyName"
                value={companyName}
                onChange={onChangeCompanyName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Create Company</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      )}
    </div>
  );
}
