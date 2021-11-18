export const getTemplates = function() {
  return fetch('https://api.imgflip.com/get_memes')
    .then((response) => response.json());
};

export const generateMeme = function({ text0, text1, id: template_id }) {
  const formData = new FormData();
  formData.append('text0', text0);
  formData.append('text1', text1);
  formData.append('template_id', template_id);
  formData.append('username', process.env.VUE_APP_IMGFLIP_USERNAME);
  formData.append('password', process.env.VUE_APP_IMGFLIP_PWD);
  return fetch('https://api.imgflip.com/caption_image', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json());
};

