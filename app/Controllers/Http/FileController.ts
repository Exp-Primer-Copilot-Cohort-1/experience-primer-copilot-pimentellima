import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
const path = require('path');

class FileController {
	async downloadClientModel({ params, response }: HttpContextContract) {
		const filePath = 'clientDataModel.csv'
		const isExist = await Drive.exists(filePath)
		if (isExist) {
			return response.download(path.join(__dirname, '../../../public/clientDataModel.csv'))
		}
		return 'File does not exist'
	}
}

export default FileController
