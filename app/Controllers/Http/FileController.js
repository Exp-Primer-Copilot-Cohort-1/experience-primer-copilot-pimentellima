/* eslint-disable no-console */
/* eslint-disable consistent-return */
// eslint-disable-next-line lines-around-directive
'use strict';

const Drive = use('Drive');
const Helpers = use('Helpers');
class FileController {
  async store({ request, response }) {
    try {
      if (!request.file('file')) return;
      const file = request.file('file', { size: '100mb' });
      const fileName = `${Date.now()}.${file.extname}`;
      await file.move(Helpers.tmpPath('uploads'), {
        name: fileName,
      });
      const fileBuffer = await Drive.get(`uploads/${fileName}`);
      await Drive.disk('s3').put(fileName, fileBuffer, {
        ACL: 'public-read',
        ContentType: file.headers['content-type'],
      });
      // Função...

      await Drive.delete(`uploads/${fileName}`);

      const url = await Drive.disk('s3').getUrl(fileName);
      return url;
    } catch (err) {
      console.error(err);
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no upload de arquivo' } });
    }
  }

  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.file}`));
  }
}

module.exports = FileController;
