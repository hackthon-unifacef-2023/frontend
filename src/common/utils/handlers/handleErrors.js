export const handleErrors = (error) => {
  let response = {
    success: false,
    message: 'Sistema indisponível no momento. Tente novamente mais tarde.',
  };

  if (error?.response?.data?.messages) {
    for (var i = 0; i < error.response.data.messages.length; i++) {
      response.message = error.response.data.messages[i];
    }
  }

  return response;
};
