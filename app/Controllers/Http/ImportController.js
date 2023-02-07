/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

'use strict';

const ImportService = use('App/Services/ImportService');
const Helpers = use('Helpers');
const User = use('App/Models/User');

class ImportController {
  async import({request, auth}) {
    const userLogged = auth.user;
    try {
      const upload = request.file('upload');
      const fname = `${new Date().getTime()}.${upload.extname}`;
      const dir = 'upload/';

      // move uploaded file into custom folder
      await upload.move(Helpers.tmpPath(dir), {
        name: fname,
      });

      if (!upload.moved()) {
        console.log('error');
        return (upload.error(), 'Error moving files', 500);
      }

      const resp = await ImportService.ImportClassification(`tmp/${dir}${fname}`);
      for (const itm of resp) {
        await User.create({
          unity_id: userLogged.unity_id,
          avatar: '',
          active: true,
          due_date: null,
          name: itm[3],
          birth_date: itm[5],
          genrer: itm[6],
          document: itm[7],
          number_id: itm[8],
          celphone: itm[12],
          phone: itm[11],
          cep: itm[21],
          address: itm[22],
          neighbohood: itm[25],
          complement: itm[24],
          address_number: itm[23],
          city: itm[26],
          state: itm[27],
          country: itm[28],
          naturalness: '',
          nationality: itm[20],
          profession: itm[33],
          observation: '',
          email: itm[14],
          password: null,
        });
      }

      return true;
    } catch (er) {
      console.log(er);
      return false;
    }
  }
}

module.exports = ImportController;
