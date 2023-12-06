import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const path = require('path')

class FileController {

	async downloadClientModel({ response }: HttpContextContract) {
		const filePath = 'clientDataModel.csv'
		const isExist = await Drive.exists(filePath)
		if (isExist) {
			return response.download(
				path.join(__dirname, '../../../public/clientDataModel.csv'),
			)
		}
		return 'File does not exist'
	}
}

export default FileController
