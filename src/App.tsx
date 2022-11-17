import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import {
  Button,
  CustomProvider,
  ButtonToolbar,
  Panel,
  Placeholder,
  Row,
  Col,
  Content,
  Header,
  InputNumber,
  Progress,
  Divider,
  FlexboxGrid,
  Container,
  Stack,
  Grid,
  Animation,
  Toggle,
  RadioGroup,
  Radio,
  Timeline,
  Modal,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import SessionInput from "./Components/SessionSettingsPanel";
import ModalAlert from "./Components/ModalAlert";
import socketIOClient from "socket.io-client";
import ChartPanel from "./Components/ChartPanel";
import { ModalState } from "./Models/Models";
import RemindRoundIcon from "@rsuite/icons/RemindRound";
import { ConnectionStatus } from "./Models/ConnectionState";

function App() {
  const [theme, setTheme] = useState<
    "light" | "dark" | "high-contrast" | undefined
  >("light");

  const switchTheme = (e: any) => setTheme(e.target.value);

  const [show, setShow] = React.useState(true);
  const onChange = () => setShow(!show);

  const [forceTarget, setForceTarget] = useState(1000);

  const defaultPadding = 20;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errorMessage, setErrorMessage] = useState("");
  // ipcRenderer.send("searchSerialPort", "test");

  // const ENDPOINT = "http://127.0.0.1:4001";
  // const [response, setResponse] = useState("");

  useEffect(() => {
    const getReponse = async () => await window.electronAPI.getSerialPorts();
    getReponse().then((response: ConnectionStatus) => {
      if (response !== ConnectionStatus.BOTH_DEVICES_ARE_CONNECTED) {
        setErrorMessage(response.toString());
        handleOpen();
      }
    });
  });

  return (
    <CustomProvider theme={theme}>
      <div
        className="App"
        style={{
          textAlign: "center",
          padding: defaultPadding,
        }}
      >
        {/* <ButtonToolbar>
          <Button appearance="default" onClick={switchTheme} value="light">
            Light theme
          </Button>
          <Button appearance="primary" onClick={switchTheme} value="dark">
            Dark theme
          </Button>
        </ButtonToolbar> */}
        {/* <Divider></Divider> */}
        <div>
          <Grid fluid>
            <Row gutter={20}>
              <Col md={8}>
                <Stack direction="column" spacing={20} alignItems="stretch">
                  <SessionInput
                    // onPropertyChange={(formData) => }
                    onClick={(formData) => {
                      setForceTarget(formData.force);
                      window.electronAPI.writeArduino(
                        `${formData.iterations},${formData.force},${formData.push}`
                      );
                    }}
                  ></SessionInput>
                  <Button
                    onClick={() => {
                      window.electronAPI.readArduino();
                    }}
                  >
                    Read
                  </Button>
                  <Panel header="Session Progress" shaded>
                    <Stack direction="column" spacing={20} alignItems="stretch">
                      <Progress.Line percent={45} status="active" />
                      <Timeline>
                        <Timeline.Item>16:27:41 Session Started</Timeline.Item>
                        <Timeline.Item>16:28:43 50% Done</Timeline.Item>

                        <Timeline.Item>
                          16:28:45 Test results available
                        </Timeline.Item>
                        <Timeline.Item>
                          02:34:41 Send to Shanghai Hongkou Company
                        </Timeline.Item>
                        <Timeline.Item>
                          15:05:29 Sending you a piece
                        </Timeline.Item>
                      </Timeline>
                    </Stack>
                  </Panel>
                </Stack>
              </Col>
              <Col md={16}>
                <Row>
                  <ChartPanel forceTarget={forceTarget} />
                </Row>
              </Col>
            </Row>
          </Grid>
          <Modal open={open} onClose={handleClose} size={"xs"}>
            <Modal.Header>
              <Modal.Title>
                {" "}
                <RemindRoundIcon
                  style={{ color: "#f08901", fontSize: 30 }}
                />{" "}
                Error
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleClose}
                appearance="primary"
                color={"orange"}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>

          {/* </Row>

          {/* <Row>
              <Col md={6} sm={12}>
                <Panel header="Iterations" shaded>
                  <InputNumber min={0} step={1} />
                </Panel>{" "}
              </Col>
              <Col md={6} sm={12}>
                <Panel header="Testing Progress" shaded>
                  <Progress.Line percent={30} status="active" />
                </Panel>{" "}
              </Col>
              <Col md={6} sm={12}>
                <Animation.Collapse in={show}>
                  {(props, ref) => (
                    <div {...props} ref={ref}>
                      <Panel header="Panel title" shaded>
                      </Panel>
                    </div>
                  )}
                </Animation.Collapse>
              </Col>
              <Col md={6} sm={12}>
                <Panel header="Control Buttons" shaded>
                  <FlexboxGrid justify="space-around">
                    <FlexboxGrid.Item>
                      <ButtonToolbar>
                        <Button
                          color="orange"
                          appearance="primary"
                          onClick={onChange}
                        >
                          Hide
                        </Button>
                        <Button color="green" appearance="primary">
                          Red
                        </Button>
                        <Button color="cyan" appearance="primary">
                          Orange
                        </Button>
                        <Button color="violet" appearance="primary">
                          Yellow
                        </Button>
                      </ButtonToolbar>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Panel>{" "}
              </Col>
            </Row> */}
          {/* </Grid> */}
        </div>
      </div>
    </CustomProvider>
  );
}

export default App;
