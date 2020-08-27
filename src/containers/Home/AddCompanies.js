import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTags from "react-tag-autocomplete";
import companyService from "../../services/companyService";
// import suggestions from './countries'

export default function AddCompanies(props) {
  const reactTags = useRef();

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    companyService.getAllCompanies(props.jwt).then((response) => {
      setSuggestions(response.data.companies);
    });
  }, []);
  const onDelete = (i) => {
    const newTags = props.tags.slice(0);
    newTags.splice(i, 1);
    props.setTags(newTags);
  };

  const onAddition = (tag) => {
    const newTags = [].concat(props.tags, tag);
    props.setTags(newTags);
  };

  return (
    <div>
      <ReactTags
        ref={reactTags}
        tags={props.tags}
        placeholderText={"Add Company"}
        suggestions={suggestions}
        onDelete={onDelete}
        onAddition={onAddition}
      />
    </div>
  );
}
