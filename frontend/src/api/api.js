import axios from "axios";

export const getCourses = async (dept) => {

    return await axios.get(
        "http://127.0.0.1:8000/department/getcourse/"+dept
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

};

export const getCourseTranscripts = async (course) => {

    var data={
        "course":course
    }
    return await axios.post(
        "http://127.0.0.1:8000/course/getTranscripts",data
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

};

export const downloadCourseTranscripts = async (lecture,link) => {

    var data={
        "lec_no":lecture,
        "link": link
    }
    return await axios.post(
        "http://127.0.0.1:8000/course/downloadTranscripts",data
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

};

export const summariseText = async (text) => {

    var data={
        "text":text
    }
    return await axios.post(
        "http://127.0.0.1:8000/course/summariseText",data
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

};

export const generateQues = async (text) => {

    var data={
        "text":text
    }
    return await axios.post(
        "http://127.0.0.1:8000/course/quesGen",data
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

};

export const generate_yt = async (c,l) => {

    var data={
        "course":c,
        "lec":l
    }
    return await axios.post(
        "http://127.0.0.1:8000/course/getYT",data
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

};