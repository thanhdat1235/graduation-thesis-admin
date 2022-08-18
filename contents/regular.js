export const PATTERN = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
  PHONE: /(84|0[3|5|7|8|9])+([0-9]{8})\b/i,
  FB: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/i,
  VARIABLE_NAME: /^[a-zA-Z_$][a-zA-Z_$0-9]*$/i,
  ONLY_TWO_NUMBER: /^[0-9\b]{0,2}$/,
  ONLY_NUMBER: /^[0-9]*$/,
  LINK: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
};
