import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Panel from "../components/Panel";
import CustomizedSnackBar from "../components/CustomizedSnackBar";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormDialog from "../components/FormDialog";

const devData = window.props;

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto !important",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "50px 0"
  },
  panelsList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

const PanelsList = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.panelsList}>{children}</div>;
};

// MAIN COMPONENT
const DomainsManager = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [openAlert, setAlert] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = () => {
      if (process.env.NODE_ENV !== "development") {
        fetch('/tma_apps/tma_api/v0/email_allowed/',
          {
            credentials: "same-origin",
            method: "GET",
          }
        )
          .then(response => response.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          }).catch((error) => {
            setLoading(true)
            console.log(error.message);
          })
      } else {
        setData(devData);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveData = useCallback((data) => {
    fetch('/tma_apps/tma_api/v0/email_allowed/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': window.csrf
      },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (response.status === 200) {
        setData(data);
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }, []);

  const removeExistingOrg = useCallback(
    (org) => {
      const newData = { ...data };
      delete newData[org];
      saveData(newData);
    },
    [data, saveData]
  );

  const addNewOrg = useCallback(
    (org) => {
      const newData = { ...data };
      let allOrgs = []

      for (let i = 0; i < Object.keys(newData).length; i++) {
        allOrgs.push(Object.keys(newData)[i].toLowerCase());
      }

      if (
        (org !== "" || org.trim() !== "") &&
        allOrgs.indexOf(org.toLowerCase()) === -1
      ) {
        newData[org] = {
          compteurMax: 0,
          compteurTotal: 0,
          domain: [],
          admins: [],
        };
        setData(newData);
      } else {
        setAlert(true);
      }
    },
    [data, setData, setAlert]
  );

  const closeAlert = useCallback(() => {
    setAlert(false);
  }, []);

  const handleChange = useCallback(
    (event, org) => {
      const { value, name } = event.target;
      const newData = { ...data };

      name === "domain" || name === "admins"
        ? (newData[org][name] = value.trim().split(","))
        : (newData[org][name] = parseInt(value));

      setData(newData);
    },
    [data, setData]
  );

  const renderPanels = useCallback(() => {
    return Object.keys(data).map((org, index) => {
      return (
        <header key={index}>
          <Panel
            org={org}
            data={data}
            removeExistingOrg={removeExistingOrg}
            saveData={saveData}
            handleChange={handleChange}
          />
        </header>

      );
    });
  }, [data, handleChange, saveData, removeExistingOrg]);

  if (!isLoading) {
    return (
      <div className={classes.root}>
        <PanelsList> {renderPanels()}</PanelsList>
        <FormDialog addNewOrg={addNewOrg} />
        <CustomizedSnackBar openAlert={openAlert} closeAlert={closeAlert} />
      </div>
    );
  }

  return <LinearProgress color="primary" />;
};

export default DomainsManager;
