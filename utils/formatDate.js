import moment from "moment";
function formatDate(date) {
  return moment(date).format("h:mm DD/MM/YYYY");
}

export default formatDate;
