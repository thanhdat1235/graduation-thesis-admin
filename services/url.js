const API_URL = "http://localhost:4001";
// const API_URL = "http://192.168.100.4:4001";
// const API_URL = "http://192.168.100.47:4001";

// USER_URL
const REGISTER_URL = `${API_URL}/admin/register`;
const LOGIN_URL = `${API_URL}/admin/login`;
const GET_ALL_URL = `${API_URL}/admin/`;
const LOGOUT_URL = `${API_URL}/admin/logout`;
const REFRESH_TOKEN_URL = `${API_URL}/admin/refresh-token`;
const GET_ONE_URL = `${API_URL}/admin/user/`;
const UPDATE_URL = `${API_URL}/admin/update/`;
const DELETE_ONE = `${API_URL}/admin/delete/`;
const DELETE_MANY_URL = `${API_URL}/admin/delete-many`;
const FORGOTPASSWORD_URL = `${API_URL}/admin/forgotpassword`;
const VERIFY_OTP_URL = `${API_URL}/admin/verify-otp/`;
const RESET_PASSWORD_URL = `${API_URL}/admin/reset-password/`;
const SEARCH_URL = `${API_URL}/admin/search`;
// POST_URL
const UPLOAD_IMAGE_URL = `${API_URL}/file-upload/images`;
const FIND_ALL_CATEGORY_URL = `${API_URL}/category/get-all-categories`;
const GET_ALL_POST_URL = `${API_URL}/post`;
const CREATE_POST_URL = `${API_URL}/post/create`;
const GET_ALL_TAGS_URL = `${API_URL}/tag`;
const CREATE_CATEGORY_URL = `${API_URL}/category/create`;
const CREATE_TAG_URL = `${API_URL}/tag/create`;
const FIND_ONE_POST_URL = `${API_URL}/post/`;
const UPDATE_POST_URL = `${API_URL}/post/update/`;
const DELETE_POST_URL = `${API_URL}/post/delete/`;
const DELETE_MANY_POST_URL = `${API_URL}/post/delete-many`;
// CONTACT_URL
const GET_ALL_CONTACT_URL = `${API_URL}/contact`;
const DELETE_CONTACT_URL = `${API_URL}/contact/delete/`;
const DELETE_MANY_CONTACT_URL = `${API_URL}/contact/delete-many`;
// QUESTION_URL
const GET_ALL_QUESTION_URL = `${API_URL}/question`;
const CREATE_QUESTION_URL = `${API_URL}/question/create`;
const DELETE_QUESTION_URL = `${API_URL}/question/`;
const DELETE_MANY_QUESTION_URL = `${API_URL}/question/delete/delete-many`;
const FIND_QUESTION_BY_ID_URL = `${API_URL}/question/`;
const FIND_QUESTION_BY_ID_AND_UPDATE_URL = `${API_URL}/question/`;
// PUBLISHER
const CREATE_PUBLISHER_URL = `${API_URL}/publisher/create`;
const GET_ALL_PUBLISHER_URL = `${API_URL}/publisher`;
// SUPPLIER
const CREATE_SUPPLIER_URL = `${API_URL}/supplier/create`;
const GET_ALL_SUPPLIER_URL = `${API_URL}/supplier`;
// AUTHOR
const CREATE_AUTHOR_URL = `${API_URL}/author/create`;
const GET_ALL_AUTHOR_URL = `${API_URL}/author`;
// BOOK_URL
const GET_ALL_BOOK_URL = `${API_URL}/book`;
const CREATE_BOOK_URL = `${API_URL}/book/create`;
const DELETE_BOOK_URL = `${API_URL}/book/`;
const FIND_ONE_BOOK_URL = `${API_URL}/book/`;
const UPDATE_BOOK_URL = `${API_URL}/book/`;

export {
  // Users
  API_URL,
  REGISTER_URL,
  LOGIN_URL,
  GET_ALL_URL,
  LOGOUT_URL,
  REFRESH_TOKEN_URL,
  GET_ONE_URL,
  UPDATE_URL,
  DELETE_ONE,
  DELETE_MANY_URL,
  FORGOTPASSWORD_URL,
  VERIFY_OTP_URL,
  RESET_PASSWORD_URL,
  SEARCH_URL,
  // Upload Files
  UPLOAD_IMAGE_URL,
  // Categories
  FIND_ALL_CATEGORY_URL,
  CREATE_CATEGORY_URL,
  // Tags
  GET_ALL_TAGS_URL,
  CREATE_TAG_URL,
  // Posts
  GET_ALL_POST_URL,
  CREATE_POST_URL,
  FIND_ONE_POST_URL,
  UPDATE_POST_URL,
  DELETE_POST_URL,
  DELETE_MANY_POST_URL,
  // Contacts
  GET_ALL_CONTACT_URL,
  DELETE_CONTACT_URL,
  DELETE_MANY_CONTACT_URL,
  // Question
  GET_ALL_QUESTION_URL,
  DELETE_QUESTION_URL,
  DELETE_MANY_QUESTION_URL,
  CREATE_QUESTION_URL,
  FIND_QUESTION_BY_ID_URL,
  FIND_QUESTION_BY_ID_AND_UPDATE_URL,
  //  PUBLISHER
  CREATE_PUBLISHER_URL,
  GET_ALL_PUBLISHER_URL,
  // SUPPLIER
  CREATE_SUPPLIER_URL,
  GET_ALL_SUPPLIER_URL,
  // AUTHOR
  CREATE_AUTHOR_URL,
  GET_ALL_AUTHOR_URL,
  // BOOK
  GET_ALL_BOOK_URL,
  CREATE_BOOK_URL,
  DELETE_BOOK_URL,
  FIND_ONE_BOOK_URL,
  UPDATE_BOOK_URL,
};
