module.exports = (body, schema) => {
  validate = schema().validate(body);

  return validate;
};
