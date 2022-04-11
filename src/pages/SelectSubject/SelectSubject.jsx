import "./SelectSubject.scss";

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeaderWithIcon from "../../components/header-with-icon/header-with-icon";
import { getSubject } from "../../services/get-subject";
import { LoadingPopup } from "../../components/loading-popup/loading-popup";
import { Container, Button } from "@mui/material";

const SelectSubject = () => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function handleGetSubject() {
      setLoading(true);
      getSubject().then((res) => {
        setLoading(false);
        setSubject(res.subject_items);
      });
    }
    handleGetSubject();
  }, []);

  const onClickSelect = (subject) => {
    console.log(subject);
    history.push({
      pathname: "/teacher/create-exam",
      state: {
        data: subject,
      },
    });
  };

  return (
    <React.Fragment>
      <LoadingPopup open={loading} />
      <HeaderWithIcon title="โปรดเลือกรายวิชา" description="" icon={null} />
      <Container maxWidth="lg">
        <div className="subject-container">
          <div className="text-style">ชื่อรายวิชาทั้งหมด ที่สามารถเลือกได้</div>
          {subject.map((data, index) => {
            return (
              <Button
                variant="outlined"
                className="button-select-subject"
                onClick={() => {
                  onClickSelect(data.name);
                }}
                key={index}
              >
                {data.name}
              </Button>
            );
          })}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SelectSubject;
