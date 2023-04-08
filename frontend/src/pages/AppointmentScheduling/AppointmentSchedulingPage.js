import { useRef, useState, useEffect } from "react";
import { Box, Container, HStack } from "@chakra-ui/layout";
import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { Badge, Heading } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
  getAppointmentTimes,
  getUnavailableDates,
} from "../../features/appointments/appointmentsSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { RiFolderUserFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { useFormik } from "formik";
import { FormControl, Input, FormLabel, Button } from "@chakra-ui/react";
import { createNewAppointment } from "../../features/appointments/appointmentsSlice.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const AppointmentSchedulingPage = () => {
  const calendarRef = useRef(null);

  const nextHandle = () => {
    const api = calendarRef.current.getApi();
    api.next();
    // if (calendarViewMonth == 12) {
    //   setCalendarViewYear(prev => prev += 1)
    //   setCalendarViewMonth((prev) => (prev = 1));
    // } else {
    //   setCalendarViewMonth((prev) => (prev += 1));
    // }
  };

  const prevHandle = () => {
    const api = calendarRef.current.getApi();
    api.prev();
    // if (calendarViewMonth == 1) {
    //   setCalendarViewYear(prev => prev -= 1)
    //   setCalendarViewMonth((prev) => (prev = 12));
    // } else {
    //   setCalendarViewMonth((prev) => (prev -= 1));
    // }
  };

  const navigate = useNavigate();

  const notify = () => toast.error("Only future dates are valid!");
  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  const validate = (values) => {
    const errors = {};

    const regexName = new RegExp(/^[A-Z]+[a-zA-Z]{1,19}$/);
    const regexPhone = new RegExp(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );
    const regexDate = new RegExp(
      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
    );
    const regexTime = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
    if (!values.fname) {
      errors.fname = "First and last name Required";
    } else if (!regexName.test(values.fname)) {
      errors.fname = "Must include first and last name!";
    }

    if (!values.lname) {
      errors.lname = "First and last name Required";
    } else if (!regexName.test(values.lname)) {
      errors.lname = "Must include first and last name!";
    }

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.phone) {
      errors.phone = "phone is Required";
    } else if (!regexPhone.test(values.phone)) {
      errors.phone = "Must be exactly 10 characters!";
    }

    if (!regexDate.test(date)) {
      console.log(date);
      errors.date = "Date is Required";
    }

    if (!regexTime.test(time)) {
      console.log(values.time);
      console.log(!values.time);
      errors.time = "Time Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fname: "Re",
      lname: "Test",
      email: `${randomId()}@email.com`,
      phone: "1111111111",
      date: "",
      time: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (
        !JSON.parse(localStorage.getItem("serviceID")) ||
        !localStorage.getItem("date") ||
        !localStorage.getItem("time")
      ) {
        alert("Appointment date and time required!");
        return;
      }

      const serviceID = JSON.parse(localStorage.getItem("serviceID"));
      const date = localStorage.getItem("date");
      const time = localStorage.getItem("time");

      localStorage.removeItem("serviceID");
      localStorage.removeItem("date");
      localStorage.removeItem("time");

      try {
        dispatch(
          createNewAppointment({
            fname: values.fname,
            lname: values.lname,
            email: values.email,
            phone: values.phone,
            service: serviceID,
            date: date,
            time: time,
          })
        );

        navigate("/thank-you");
        resetForm({ values: "" });
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const dispatch = useDispatch();

  const fetchedTimesRef = useRef(false);
  const { openAppointmentTimes, isLoading, isError, message } = useSelector(
    (state) => state.appointments
  );

  const convertDateToMonth = (str) => {
    let date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2);
    return month;
  };

  const convertDateToYear = (str) => {
    let date = new Date(str);
    return date.getFullYear();
  };

  const [date, setDate] = useState(`Select a Date`);
  const [time, setTime] = useState(`Select a Time`);
  const [calendarViewMonth, setCalendarViewMonth] = useState(
    parseInt(convertDateToMonth(new Date()))
  );
  const [calendarViewYear, setCalendarViewYear] = useState(
    parseInt(convertDateToYear(new Date()))
  );
  const [morningTimes, setMorningTimes] = useState([]);
  const [afternoonTimes, setAfternoonTimes] = useState([]);

  const fetchedTimes = () => {
    dispatch(getAppointmentTimes({ date: date }));
  };

  const convertTo12hrBasedTimes = (time) => {
    let part1, part2;
    let convertedTime;
    if (time > 1259) {
      convertedTime = time - 1200;
      part1 = convertedTime.toString().slice(0, 1) + `:`;
      part2 = convertedTime.toString().slice(1) + ` P.M.`;
      convertedTime = part1 + part2;
    } else if (time < 1200) {
      convertedTime = time;
      part1 = convertedTime.toString().slice(0, 2) + `:`;
      part2 = convertedTime.toString().slice(2) + ` A.M.`;
      convertedTime = part1 + part2;
    } else {
      convertedTime = time;
      part1 = convertedTime.toString().slice(0, 2) + `:`;
      part2 = convertedTime.toString().slice(2) + ` P.M.`;
      convertedTime = part1 + part2;
    }

    return convertedTime;
  };

  useEffect(() => {
    dispatch(
      getUnavailableDates({ month: calendarViewMonth, year: calendarViewYear })
    );
    if (isError) {
      console.log(message);
    }
    const today = new Date();
    let month = today.getMonth();
    month =
      month.toString().length < 2 && month.toString() !== 9
        ? `${today.getMonth()}`
        : today.getMonth();
    const dayDate =
      today.getDate().toString().length < 2
        ? `${today.getDate()}`
        : today.getDate();
    const date = `${parseInt(month) + 1}-${dayDate}-${today.getFullYear()}`;

    if (fetchedTimesRef.current) return;
    fetchedTimesRef.current = true;

    try {
      fetchedTimes(date);
    } catch (error) {
      console.log(error.message);
    }
  }, [morningTimes, afternoonTimes]);

  const handleEventClick = (clickInfo) => {
    var clickedDate = getDateWithoutTime(new Date(clickInfo.date));
    var nowDate = getDateWithoutTime(new Date());
    if (clickedDate < nowDate) {
      notify();
      return;
    }

    const event = clickInfo.date;
    let month = event.getMonth();
    month =
      month.toString().length < 2 && month.toString() !== 9
        ? `${event.getMonth()}`
        : event.getMonth();
    const dayDate =
      event.getDate().toString().length < 2
        ? `${event.getDate()}`
        : event.getDate();
    setDate((prev) => {
      return `${parseInt(month) + 1}-${dayDate}-${event.getFullYear()}`;
    });
    localStorage.setItem(
      "date",
      `${parseInt(month) + 1}-${dayDate}-${event.getFullYear()}`
    );

    dispatch(
      getAppointmentTimes({
        date: `${parseInt(month) + 1}-${dayDate}-${event.getFullYear()}`,
      })
    );
  };

  function getDateWithoutTime(dt) {
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  const handleTimeCLick = (info) => {
    setTime((prev) => info);
    localStorage.setItem("time", info);
  };

  const range = {
    start: new Date(),
    end: null,
  };

  return (
    <Container maxW="960px">
      <Box my={10}>
        <Text fontWeight="bolder" fontSize="4xl">
          SCHEDULE APPOINTMENT
        </Text>
      </Box>
      <Box mb={10}>
        <Accordion defaultIndex={[0]}>
          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="teal"
                color="white"
                _hover={{ color: "white" }}
              >
                <Box as="span" flex="1" textAlign="left">
                  <HStack>
                    <Heading>
                      <FaCalendarAlt />
                    </Heading>{" "}
                    <Heading>
                      <HStack>
                        <Text fontSize="3xl">PICK A DATE</Text>{" "}
                        {date !== "Select a Date" ? (
                          <GiConfirmed color="teal" />
                        ) : null}
                      </HStack>
                    </Heading>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box pt={3} pb={10}>
                <Badge
                  variant="solid"
                  colorScheme="teal"
                  px={6}
                  borderRadius="10px"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bolder"
                >
                  {date}
                </Badge>
              </Box>
              <FullCalendar
                ref={calendarRef}
                customButtons={{
                  customNextMonthButton: {
                    text: "Next",
                    click: () => {
                      nextHandle();
                    },
                  },
                  customPrevMonthButton: {
                    text: "Prev",
                    click: () => {
                      prevHandle();
                    },
                  },
                }}
                headerToolbar={{
                  right: `customPrevMonthButton customNextMonthButton`,
                  left: "title",
                }}
                height="490px"
                showNonCurrentDates="false"
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                // events={[
                //   {
                //     title: "DATE IS UNAVAILABLE",
                //     start: "2023-03-23",
                //     textColor: "white",
                //   },
                //   {
                //     title: "DATE IS UNAVAILABLE",
                //     start: "2023-04-06",
                //     textColor: "white",
                //   },
                // ]}
                validRange={range}
                selectable="true"
                dateClick={(info) => handleEventClick(info)}
                displayEventTime="false"
                datesSet={(arg) => {
                  convertDateToMonth(arg.view.currentStart);
                }}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box mb={10}>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="teal"
                color="white"
                _hover={{ color: "white" }}
              >
                <Box as="span" flex="1" textAlign="left">
                  <HStack>
                    <Heading>
                      <FaClock />
                    </Heading>{" "}
                    <Heading>
                      <HStack>
                        <Text fontSize="3xl">PICK A TIME</Text>{" "}
                        {time !== "Select a Time" ? (
                          <Heading>
                            <GiConfirmed color="teal" />
                          </Heading>
                        ) : null}
                      </HStack>{" "}
                    </Heading>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box pt={3} pb={10}>
                <Badge
                  variant="solid"
                  colorScheme="teal"
                  px={6}
                  borderRadius="10px"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bolder"
                >
                  {time === `Select a Time`
                    ? time
                    : convertTo12hrBasedTimes(time)}
                </Badge>
              </Box>
              <Box mb={5}>
                <Badge fontSize="3xl" mb={3}>
                  Morning Slots
                </Badge>
                <Flex gap={3} wrap="wrap">
                  {openAppointmentTimes.length > 0 ? (
                    openAppointmentTimes.map((time, index) => {
                      if (time <= 1300)
                        return (
                          <Text
                            display={"block"}
                            key={index}
                            mb={3}
                            onClick={() => handleTimeCLick(time)}
                          >
                            <Badge
                              borderRadius={"5px"}
                              fontSize="2xl"
                              cursor={"pointer"}
                              variant="outline"
                              _hover={{ background: "teal", color: "white" }}
                              colorScheme="teal"
                            >
                              {convertTo12hrBasedTimes(time)}
                            </Badge>
                          </Text>
                        );
                    })
                  ) : (
                    <Text>No Appointments Available!</Text>
                  )}
                </Flex>
              </Box>
              <Box mb={5}>
                <Badge fontSize="3xl" mb={3}>
                  Afternoon Slots
                </Badge>
                <Flex gap={3} wrap="wrap">
                  {openAppointmentTimes.length > 0 ? (
                    openAppointmentTimes.map((time, index) => {
                      if (time > 1300)
                        return (
                          <Text
                            display={"block"}
                            key={index}
                            mb={3}
                            onClick={() => handleTimeCLick(time)}
                          >
                            <Badge
                              borderRadius={"5px"}
                              fontSize="2xl"
                              cursor={"pointer"}
                              variant="outline"
                              _hover={{ background: "teal", color: "white" }}
                              colorScheme="teal"
                            >
                              {convertTo12hrBasedTimes(time)}
                            </Badge>
                          </Text>
                        );
                    })
                  ) : (
                    <Text>No Appointments Available!</Text>
                  )}
                </Flex>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box mb={10}>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton
                backgroundColor="teal"
                color="white"
                _hover={{ color: "white" }}
              >
                <Box as="span" flex="1" textAlign="left">
                  <HStack>
                    <Heading>
                      <RiFolderUserFill />
                    </Heading>{" "}
                    <Heading>
                      <Text fontSize="3xl">PERSONAL INFO</Text>
                    </Heading>
                  </HStack>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box>
                <FormControl>
                  <form onSubmit={formik.handleSubmit}>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input
                      id="date"
                      name="date"
                      type="text"
                      onChange={formik.handleChange}
                      value={date}
                    />
                    {formik.errors.date ? (
                      <Text color="red">{formik.errors.date}</Text>
                    ) : null}
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Input
                      id="time"
                      name="time"
                      type="text"
                      onChange={formik.handleChange}
                      value={time}
                    />
                    {formik.errors.time ? (
                      <Text color="red">{formik.errors.time}</Text>
                    ) : null}
                    <FormLabel htmlFor="name">First Name</FormLabel>
                    <Input
                      id="fname"
                      name="fname"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.fname}
                    />
                    {formik.errors.fname ? (
                      <Text color="red">{formik.errors.fname}</Text>
                    ) : null}
                    <FormLabel htmlFor="lname">Last Name</FormLabel>
                    <Input
                      id="lname"
                      name="lname"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.lname}
                    />
                    {formik.errors.lname ? (
                      <Text color="red">{formik.errors.lname}</Text>
                    ) : null}

                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email ? (
                      <Text color="red">{formik.errors.email}</Text>
                    ) : null}
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                    {formik.errors.phone ? (
                      <Text color="red">{formik.errors.phone}</Text>
                    ) : null}
                    <Button type="submit">Submit</Button>
                  </form>
                </FormControl>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
};

export default AppointmentSchedulingPage;
